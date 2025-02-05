import { customerRepository } from '@/lib/repositories/customer.repository'
import { CustomersTable } from './components/customers-table'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function CustomersPage() {
  const customers = await customerRepository.findAll()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Link href="/customers/new">
          <Button>Create Customer</Button>
        </Link>
      </div>
      <CustomersTable customers={customers} />
    </div>
  )
} 