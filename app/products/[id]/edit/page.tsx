import { ProductForm } from "../../components/product-form"

// This would normally fetch the product data from your API
const getProduct = async (id: string) => {
  // Simulated product data
  return {
    id,
    name: 'Basic Plan',
    description: 'Entry level product',
    category: 'subscription',
    price: 99.99,
    status: 'active' as const
  }
}

export default async function EditProductPage({
  params
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  )
} 