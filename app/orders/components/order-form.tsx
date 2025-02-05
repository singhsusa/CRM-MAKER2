'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Customer, Product } from "@prisma/client"

type OrderStatus = 'pending' | 'kick-off' | 'implementation' | 'live' | 'on-hold' | 'canceled'
type OrderTerm = 'monthly' | '1-year' | '2-year'

type OrderProduct = {
  id: string
  productId: string
  units: number
  pricePerUnit: number
}

type Order = {
  id: string
  customerName: string
  billingContact: {
    name: string
    email: string
    address: string
  }
  term: OrderTerm
  startDate: string
  endDate: string
  products: OrderProduct[]
  oneTimeFee: number
  accountExecutive: string
  status: OrderStatus
  orderDate: string
  notes?: string
}

interface OrderFormProps {
  order?: Order
}

export function OrderForm({ order }: OrderFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>(
    order?.products ?? [{ id: '1', productId: '', units: 1, pricePerUnit: 0 }]
  )

  // Initialize form state with order data if editing, or empty values if creating
  const [formData, setFormData] = useState({
    customerId: order?.customerId ?? '',
    billingContact: {
      name: order?.billingContact.name ?? '',
      email: order?.billingContact.email ?? '',
      address: order?.billingContact.address ?? ''
    },
    term: order?.term ?? 'monthly',
    startDate: order?.startDate ?? '',
    endDate: order?.endDate ?? '',
    oneTimeFee: order?.oneTimeFee ?? 0,
    accountExecutive: order?.accountExecutive ?? '',
    status: order?.status ?? 'pending',
    notes: order?.notes ?? ''
  })

  // Fetch customers and products when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, productsRes] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/products')
        ])
        
        if (!customersRes.ok || !productsRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const customersData = await customersRes.json()
        const productsData = await productsRes.json()

        setCustomers(customersData)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching data:', error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load customers and products"
        })
      }
    }

    fetchData()
  }, [toast])

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateBillingContact = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      billingContact: {
        ...prev.billingContact,
        [field]: value
      }
    }))
  }

  const addProduct = () => {
    setOrderProducts([
      ...orderProducts,
      { id: crypto.randomUUID(), productId: '', units: 1, pricePerUnit: 0 }
    ])
  }

  const removeProduct = (id: string) => {
    if (orderProducts.length > 1) {
      setOrderProducts(orderProducts.filter(p => p.id !== id))
    }
  }

  const updateProduct = (id: string, field: keyof OrderProduct, value: string | number) => {
    setOrderProducts(orderProducts.map(product => {
      if (product.id === id) {
        return { ...product, [field]: value }
      }
      return product
    }))
  }

  const calculateTotal = () => {
    return orderProducts.reduce((total, product) => {
      return total + (product.units * product.pricePerUnit)
    }, 0)
  }

  // Add this helper function for term-based end date calculation
  const calculateEndDate = (startDate: string, term: string): string => {
    const start = new Date(startDate)
    const end = new Date(start)
    
    switch (term) {
      case 'monthly':
        end.setMonth(end.getMonth() + 1)
        break
      case '1-year':
        end.setFullYear(end.getFullYear() + 1)
        break
      case '2-year':
        end.setFullYear(end.getFullYear() + 2)
        break
    }
    
    return end.toISOString().split('T')[0]
  }

  // Update the term handler to auto-calculate end date
  const handleTermChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      term: value,
      endDate: prev.startDate ? calculateEndDate(prev.startDate, value) : prev.endDate
    }))
  }

  // Update start date handler to recalculate end date
  const handleStartDateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      startDate: value,
      endDate: value ? calculateEndDate(value, prev.term) : prev.endDate
    }))
  }

  // Add product selection handler with auto price
  const handleProductSelect = (productId: string, orderProductId: string) => {
    const selectedProduct = products.find(p => p.id === productId)
    if (selectedProduct) {
      setOrderProducts(prev => prev.map(p => {
        if (p.id === orderProductId) {
          return {
            ...p,
            productId,
            pricePerUnit: selectedProduct.price
          }
        }
        return p
      }))
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields first
      if (!formData.customerId) {
        throw new Error('Please select a customer')
      }
      if (!formData.startDate || !formData.endDate) {
        throw new Error('Please select both start and end dates')
      }
      if (!formData.billingContact.name || !formData.billingContact.email || !formData.billingContact.address) {
        throw new Error('Please fill in all billing contact details')
      }
      if (orderProducts.some(p => !p.productId)) {
        throw new Error('Please select products for all line items')
      }

      const orderData = {
        customerId: formData.customerId,
        billingContact: formData.billingContact,
        term: formData.term,
        // Convert dates safely
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        oneTimeFee: Number(formData.oneTimeFee),
        accountExecutive: formData.accountExecutive,
        status: formData.status,
        notes: formData.notes,
        products: orderProducts.map(p => ({
          productId: p.productId,
          units: Number(p.units),
          pricePerUnit: Number(p.pricePerUnit)
        }))
      }

      console.log('Submitting order data:', orderData)

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create order')
      }

      toast({
        title: "Success",
        description: "Order created successfully",
      })

      router.push('/orders')
      router.refresh()
    } catch (error) {
      console.error('Error saving order:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create order",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>Customer</Label>
          <Select
            value={formData.customerId}
            onValueChange={(value) => updateField('customerId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.companyName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Billing Contact Details */}
        <div className="space-y-4">
          <h3 className="font-medium">Billing Contact</h3>
          <div className="grid gap-2">
            <Label htmlFor="billingName">Contact Name</Label>
            <Input 
              id="billingName" 
              value={formData.billingContact.name}
              onChange={(e) => updateBillingContact('name', e.target.value)}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="billingEmail">Contact Email</Label>
            <Input 
              id="billingEmail" 
              type="email"
              value={formData.billingContact.email}
              onChange={(e) => updateBillingContact('email', e.target.value)}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="billingAddress">Contact Address</Label>
            <Textarea 
              id="billingAddress"
              value={formData.billingContact.address}
              onChange={(e) => updateBillingContact('address', e.target.value)}
              required 
            />
          </div>
        </div>

        {/* Order Details */}
        <div className="grid gap-2">
          <Label htmlFor="term">Order Term</Label>
          <Select
            value={formData.term}
            onValueChange={handleTermChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="1-year">1 Year</SelectItem>
              <SelectItem value="2-year">2 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="startDate">Term Start Date</Label>
            <Input 
              id="startDate" 
              type="date" 
              value={formData.startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endDate">Term End Date</Label>
            <Input 
              id="endDate" 
              type="date"
              value={formData.endDate}
              onChange={(e) => updateField('endDate', e.target.value)}
              required 
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Products</h3>
            <Button type="button" variant="outline" onClick={addProduct}>
              Add Product
            </Button>
          </div>

          {orderProducts.map((product, index) => (
            <div key={product.id} className="space-y-4 p-4 border rounded-lg relative">
              {orderProducts.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeProduct(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              
              <div className="grid gap-2">
                <Label>Product {index + 1}</Label>
                <Select
                  value={product.productId}
                  onValueChange={(value) => handleProductSelect(value, product.id)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} - ${p.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Number of Units</Label>
                  <Input
                    type="number"
                    min="1"
                    value={product.units}
                    onChange={(e) => updateProduct(product.id, 'units', parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Price per Unit</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={product.pricePerUnit}
                    onChange={(e) => updateProduct(product.id, 'pricePerUnit', parseFloat(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="text-right text-sm text-gray-600">
                Subtotal: ${(product.units * product.pricePerUnit).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="text-right font-medium">
            Total Products Value: ${calculateTotal().toFixed(2)}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="oneTimeFee">One Time Fee</Label>
          <Input 
            id="oneTimeFee" 
            type="number" 
            step="0.01" 
            value={formData.oneTimeFee}
            onChange={(e) => updateField('oneTimeFee', parseFloat(e.target.value))}
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="accountExecutive">Account Executive</Label>
          <Input 
            id="accountExecutive" 
            value={formData.accountExecutive}
            onChange={(e) => updateField('accountExecutive', e.target.value)}
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status">Order Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => updateField('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="kick-off">Kick-off</SelectItem>
              <SelectItem value="implementation">Implementation</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="notes">Special Notes</Label>
          <Textarea id="notes" />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : order ? 'Update Order' : 'Create Order'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/orders')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
} 