'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function OrderForm() {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Add your form submission logic here
    setLoading(false)
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
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" required />
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-4">
          <h3 className="font-medium">Products</h3>
          <div className="grid gap-2">
            <Label htmlFor="product">Product</Label>
            <Select>
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
              <Label htmlFor="units">Number of Units</Label>
              <Input id="units" type="number" min="1" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pricePerUnit">Price per Unit</Label>
              <Input id="pricePerUnit" type="number" step="0.01" required />
            </div>
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

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Order'}
      </Button>
    </form>
  )
} 