'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

  // Initialize form state with order data if editing, or empty values if creating
  const [formData, setFormData] = useState({
    customerName: order?.customerName ?? '',
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

  const [products, setProducts] = useState<OrderProduct[]>(
    order?.products ?? [{ id: '1', productId: '', units: 1, pricePerUnit: 0 }]
  )

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
    setProducts([
      ...products,
      { id: crypto.randomUUID(), productId: '', units: 1, pricePerUnit: 0 }
    ])
  }

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const updateProduct = (id: string, field: keyof OrderProduct, value: string | number) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return { ...product, [field]: value }
      }
      return product
    }))
  }

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + (product.units * product.pricePerUnit)
    }, 0)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        ...formData,
        products,
        totalValue: calculateTotal() + formData.oneTimeFee
      }

      if (order) {
        // Update existing order
        const response = await fetch(`/api/orders/${order.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        })

        if (!response.ok) {
          throw new Error('Failed to update order')
        }

        toast({
          title: "Success",
          description: "Order updated successfully",
        })
      } else {
        // Create new order
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        })

        if (!response.ok) {
          throw new Error('Failed to create order')
        }

        toast({
          title: "Success",
          description: "Order created successfully",
        })
      }

      router.push('/orders')
      router.refresh()
    } catch (error) {
      console.error('Error saving order:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: order ? "Failed to update order" : "Failed to create order",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        {/* Customer Selection */}
        <div className="grid gap-2">
          <Label htmlFor="customer">Customer</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acme">Acme Corp</SelectItem>
              {/* Add more customers */}
            </SelectContent>
          </Select>
        </div>

        {/* Billing Contact Details */}
        <div className="space-y-4">
          <h3 className="font-medium">Billing Contact</h3>
          <div className="grid gap-2">
            <Label htmlFor="billingName">Contact Name</Label>
            <Input id="billingName" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="billingEmail">Contact Email</Label>
            <Input id="billingEmail" type="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="billingAddress">Contact Address</Label>
            <Textarea id="billingAddress" required />
          </div>
        </div>

        {/* Order Details */}
        <div className="grid gap-2">
          <Label htmlFor="term">Order Term</Label>
          <Select>
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
            <Input id="startDate" type="date" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endDate">Term End Date</Label>
            <Input id="endDate" type="date" required />
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

          {products.map((product, index) => (
            <div key={product.id} className="space-y-4 p-4 border rounded-lg relative">
              {products.length > 1 && (
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
                  onValueChange={(value) => updateProduct(product.id, 'productId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Plan</SelectItem>
                    {/* Add more products */}
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
          <Input id="oneTimeFee" type="number" step="0.01" defaultValue="0" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="accountExecutive">Account Executive</Label>
          <Input id="accountExecutive" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status">Order Status</Label>
          <Select>
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