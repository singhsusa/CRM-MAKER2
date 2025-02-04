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

type Customer = {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  industry: string
  address: string
}

// This will be replaced with actual data from your backend
const demoCustomers: Customer[] = [
  {
    id: '1',
    companyName: 'Acme Corp',
    contactName: 'John Doe',
    email: 'john@acme.com',
    phone: '(555) 123-4567',
    industry: 'Technology',
    address: '123 Business Ave, Suite 100, City, State 12345'
  },
]

export function CustomersTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.companyName}</TableCell>
              <TableCell>{customer.contactName}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.industry}</TableCell>
              <TableCell className="text-right">
                <Link href={`/customers/${customer.id}/edit`}>
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