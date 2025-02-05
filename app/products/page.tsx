import { productRepository } from '@/lib/repositories/product.repository'
import { ProductsTable } from './components/products-table'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProductsPage() {
  const products = await productRepository.findAll()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/products/new">
          <Button>Create Product</Button>
        </Link>
      </div>
      <ProductsTable products={products} />
    </div>
  )
} 