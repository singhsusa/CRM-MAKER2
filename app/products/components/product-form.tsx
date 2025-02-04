'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Product = {
  id: string
  name: string
  description: string
  category: string
  price: number
  status: 'active' | 'inactive'
}

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Initialize form state with product data if editing, or empty values if creating
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: product?.name ?? '',
    description: product?.description ?? '',
    category: product?.category ?? '',
    price: product?.price ?? 0,
    status: product?.status ?? 'active'
  })

  const updateField = (field: keyof Omit<Product, 'id'>, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // This would be your API call
      if (product) {
        // Update existing product
        console.log('Updating product:', { id: product.id, ...formData })
      } else {
        // Create new product
        console.log('Creating product:', formData)
      }

      // Redirect back to products list after success
      router.push('/products')
      router.refresh()
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => updateField('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="subscription">Subscription</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="addon">Add-on</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => updateField('price', parseFloat(e.target.value))}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: 'active' | 'inactive') => updateField('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/products')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
} 