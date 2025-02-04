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

type Product = {
  id: string
  name: string
  description: string
  category: string
  price: number
  status: 'active' | 'inactive'
}

// This will be replaced with actual data from your backend
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Basic Plan',
    description: 'Entry level product',
    category: 'Subscription',
    price: 99.99,
    status: 'active',
  },
]

export function ProductsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <span className={`capitalize ${
                  product.status === 'active' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/products/${product.id}/edit`}>
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