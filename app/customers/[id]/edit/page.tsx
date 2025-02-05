import { CustomerForm } from "../../components/customer-form"
import { customerRepository } from "@/lib/repositories/customer.repository"
import { notFound } from "next/navigation"

export default async function EditCustomerPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const customer = await customerRepository.findById(params.id)
  
  if (!customer) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Customer</h1>
      <CustomerForm customer={customer} />
    </div>
  )
} 