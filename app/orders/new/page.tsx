import { OrderForm } from "../components/order-form"

export default function NewOrderPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Order</h1>
      <OrderForm />
    </div>
  )
} 