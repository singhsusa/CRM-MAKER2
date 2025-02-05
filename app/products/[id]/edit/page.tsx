import { ProductForm } from "../../components/product-form"
import { productRepository } from "@/lib/repositories/product.repository"
import { notFound } from "next/navigation"

export default async function EditProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = await productRepository.findById(params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  )
} 