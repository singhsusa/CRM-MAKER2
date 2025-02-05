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
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

type OrderWithRelations = Order & {
  customer: Customer
  products: (OrderProduct & {
    product: Product
  })[]
}

interface OrdersTableProps {
  orders: OrderWithRelations[]
}

type SortField = 'orderDate' | 'customer' | 'accountExecutive' | 'status'
type SortDirection = 'asc' | 'desc'

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('orderDate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  const calculateTotal = (order: OrderWithRelations) => {
    const productsTotal = order.products.reduce((sum, item) => {
      return sum + (item.units * item.pricePerUnit)
    }, 0)
    return productsTotal + order.oneTimeFee
  }

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    const query = searchQuery.toLowerCase()
    return (
      order.customer.companyName.toLowerCase().includes(query) ||
      order.accountExecutive.toLowerCase().includes(query)
    )
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === 'orderDate') {
      return sortDirection === 'asc'
        ? a.orderDate.getTime() - b.orderDate.getTime()
        : b.orderDate.getTime() - a.orderDate.getTime()
    }
    
    if (sortField === 'customer') {
      return sortDirection === 'asc'
        ? a.customer.companyName.localeCompare(b.customer.companyName)
        : b.customer.companyName.localeCompare(a.customer.companyName)
    }

    const aValue = (a[sortField] ?? '').toLowerCase()
    const bValue = (b[sortField] ?? '').toLowerCase()
    
    return sortDirection === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue)
  })

  // Handle sort
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Sort icon component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-2 h-4 w-4" />
      : <ArrowDown className="ml-2 h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by customer or account executive..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('orderDate')}
            >
              Order Date
              <SortIcon field="orderDate" />
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('customer')}
            >
              Customer
              <SortIcon field="customer" />
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('accountExecutive')}
            >
              Account Executive
              <SortIcon field="accountExecutive" />
            </TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('status')}
            >
              Status
              <SortIcon field="status" />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                {searchQuery 
                  ? 'No orders found matching your search'
                  : 'No orders found'}
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
                  <span className="capitalize">{order.status}</span>
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