import { ProductsTable } from "./components/products-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>
      <ProductsTable />
    </div>
  )
} 