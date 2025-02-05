import { OrderForm } from "../../components/order-form"
import { orderRepository } from "@/lib/repositories/order.repository"
import { notFound } from "next/navigation"

export default async function EditOrderPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const order = await orderRepository.findById(params.id)
  
  if (!order) {
    notFound()
  }

  // Transform the data to match the form's expected format
  const formattedOrder = {
    id: order.id,
    customerId: order.customerId,
    billingContact: order.billingContact,
    term: order.term,
    startDate: order.startDate.toISOString().split('T')[0],
    endDate: order.endDate.toISOString().split('T')[0],
    oneTimeFee: order.oneTimeFee,
    accountExecutive: order.accountExecutive,
    status: order.status,
    notes: order.notes,
    products: order.products.map(p => ({
      id: p.id,
      productId: p.productId,
      units: p.units,
      pricePerUnit: p.pricePerUnit
    }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Order</h1>
      <OrderForm order={formattedOrder} />
    </div>
  )
} 