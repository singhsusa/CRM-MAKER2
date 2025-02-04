'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

type CustomerStatus = 'in-implementation' | 'on-hold' | 'live' | 'terminated'

type Customer = {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  industry: string
  status: CustomerStatus
  address: string
}

interface CustomerFormProps {
  customer?: Customer
}

export function CustomerForm({ customer }: CustomerFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Initialize form state with customer data if editing, or empty values if creating
  const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
    companyName: customer?.companyName ?? '',
    contactName: customer?.contactName ?? '',
    email: customer?.email ?? '',
    phone: customer?.phone ?? '',
    industry: customer?.industry ?? '',
    status: customer?.status ?? 'in-implementation',
    address: customer?.address ?? ''
  })

  const updateField = (field: keyof Omit<Customer, 'id'>, value: string) => {
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
      if (customer) {
        // Update existing customer
        console.log('Updating customer:', { id: customer.id, ...formData })
      } else {
        // Create new customer
        console.log('Creating customer:', formData)
      }

      // Redirect back to customers list after success
      router.push('/customers')
      router.refresh()
    } catch (error) {
      console.error('Error saving customer:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="contactName">Contact Person Name</Label>
          <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => updateField('contactName', e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="industry">Industry Type</Label>
          <Select
            value={formData.industry}
            onValueChange={(value) => updateField('industry', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status">Customer Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: CustomerStatus) => updateField('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in-implementation">In Implementation</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : customer ? 'Update Customer' : 'Create Customer'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/customers')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
} 