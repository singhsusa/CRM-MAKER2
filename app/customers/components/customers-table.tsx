'use client'

import { Customer } from '@prisma/client'
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

interface CustomersTableProps {
  customers: Customer[]
}

type SortField = 'companyName' | 'contactName' | 'email' | 'industry' | 'status'
type SortDirection = 'asc' | 'desc'

export function CustomersTable({ customers }: CustomersTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('companyName')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => {
    const query = searchQuery.toLowerCase()
    return (
      customer.companyName.toLowerCase().includes(query) ||
      customer.contactName.toLowerCase().includes(query)
    )
  })

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const aValue = a[sortField]?.toLowerCase() ?? ''
    const bValue = b[sortField]?.toLowerCase() ?? ''
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue)
    }
    return bValue.localeCompare(aValue)
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
          placeholder="Search by company or contact name..."
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
              onClick={() => handleSort('companyName')}
            >
              Company Name
              <SortIcon field="companyName" />
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('contactName')}
            >
              Contact Name
              <SortIcon field="contactName" />
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('email')}
            >
              Email
              <SortIcon field="email" />
            </TableHead>
            <TableHead>Phone</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('industry')}
            >
              Industry
              <SortIcon field="industry" />
            </TableHead>
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
          {sortedCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                {searchQuery 
                  ? 'No customers found matching your search'
                  : 'No customers found'}
              </TableCell>
            </TableRow>
          ) : (
            sortedCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.companyName}</TableCell>
                <TableCell>{customer.contactName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.industry}</TableCell>
                <TableCell>
                  <span className={`capitalize ${
                    customer.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {customer.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/customers/${customer.id}/edit`)}
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