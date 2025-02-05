'use client'

import { Order, Customer, OrderProduct, Product } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

type OrderWithRelations = Order & {
  customer: Customer
  products: (OrderProduct & {
    product: Product
  })[]
}

interface OrdersTableProps {
  orders: OrderWithRelations[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter()
  const [sortField, setSortField] = useState<keyof OrderWithRelations>('orderDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  const calculateTotal = (order: OrderWithRelations) => {
    const productsTotal = order.products.reduce((sum, item) => {
      return sum + (item.units * item.pricePerUnit)
    }, 0)
    return productsTotal + order.oneTimeFee
  }

  const statusColors: Record<string, string> = {
    pending: 'text-yellow-600',
    'kick-off': 'text-blue-600',
    implementation: 'text-purple-600',
    live: 'text-green-600',
    'on-hold': 'text-orange-600',
    canceled: 'text-red-600'
  }

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortField === 'orderDate') {
      return sortDirection === 'asc' 
        ? a.orderDate.getTime() - b.orderDate.getTime()
        : b.orderDate.getTime() - a.orderDate.getTime()
    }
    return 0
  })

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => {/* sorting logic */}}>Order Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Account Executive</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            sortedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatDate(order.orderDate)}</TableCell>
                <TableCell>{order.customer.companyName}</TableCell>
                <TableCell>{order.accountExecutive}</TableCell>
                <TableCell>${calculateTotal(order).toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/orders/${order.id}/edit`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 