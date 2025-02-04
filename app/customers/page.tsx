import { CustomersTable } from "./components/customers-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Link href="/customers/new">
          <Button>Add Customer</Button>
        </Link>
      </div>
      <CustomersTable />
    </div>
  )
} 