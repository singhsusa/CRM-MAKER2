import { OrdersTable } from "./components/orders-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Link href="/orders/new">
          <Button>Create Order</Button>
        </Link>
      </div>
      <OrdersTable />
    </div>
  )
} 