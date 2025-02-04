'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type OrderStatus = 'pending' | 'kick-off' | 'implementation' | 'live' | 'on-hold' | 'canceled'

type Order = {
  id: string
  customerName: string
  billingContact: {
    name: string
    email: string
    address: string
  }
  term: 'monthly' | '1-year' | '2-year'
  startDate: string
  endDate: string
  products: Array<{
    name: string
    units: number
    pricePerUnit: number
  }>
  oneTimeFee: number
  accountExecutive: string
  status: OrderStatus
  totalValue: number
  orderDate: string
  notes?: string
}

// This will be replaced with actual data from your backend
const demoOrders: Order[] = [
  {
    id: '1',
    customerName: 'Acme Corp',
    billingContact: {
      name: 'Jane Smith',
      email: 'jane@acme.com',
      address: '123 Billing St, City, State 12345'
    },
    term: '1-year',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    products: [
      {
        name: 'Basic Plan',
        units: 100,
        pricePerUnit: 99.99
      }
    ],
    oneTimeFee: 499.99,
    accountExecutive: 'Bob Wilson',
    status: 'live',
    totalValue: 10498.99,
    orderDate: '2024-02-15',
    notes: 'Priority implementation requested'
  }
]

const statusColors: Record<OrderStatus, string> = {
  pending: 'text-yellow-600',
  'kick-off': 'text-blue-600',
  implementation: 'text-purple-600',
  live: 'text-green-600',
  'on-hold': 'text-orange-600',
  canceled: 'text-red-600'
}

export function OrdersTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>AE</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
              <TableCell className="capitalize">{order.term}</TableCell>
              <TableCell>
                <span className={`capitalize ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{order.accountExecutive}</TableCell>
              <TableCell>${order.totalValue.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Link href={`/orders/${order.id}/edit`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 