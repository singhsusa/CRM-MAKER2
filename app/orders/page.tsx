import { orderRepository } from '@/lib/repositories/order.repository'
import { OrdersTable } from './components/orders-table'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function OrdersPage() {
  const orders = await orderRepository.findAll()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Link href="/orders/new">
          <Button>Create Order</Button>
        </Link>
      </div>
      <OrdersTable orders={orders} />
    </div>
  )
} 