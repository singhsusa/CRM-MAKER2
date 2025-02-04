import { ProductForm } from "../../components/product-form"
import { notFound } from "next/navigation"

// This would normally fetch the product data from your API
const getProduct = async (id: string) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // This would be your database call
    // For now, returning mock data
    return {
      id,
      name: 'Basic Plan',
      description: 'Entry level product',
      category: 'subscription',
      price: 99.99,
      status: 'active' as const
    }
  } catch (error) {
    return null
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
    // Ensure params is awaited
    const { id } = await params; // Explicitly awaiting params
  
    const product = await getProduct(id);
  
    if (!product) {
      notFound();
    }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  )
} 