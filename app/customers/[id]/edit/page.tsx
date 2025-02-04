import { CustomerForm } from "../../components/customer-form"

// This would normally fetch the customer data from your API
const getCustomer = async (id: string) => {
  // Simulated customer data
  return {
    id,
    companyName: 'Acme Corp',
    contactName: 'John Doe',
    email: 'john@acme.com',
    phone: '(555) 123-4567',
    industry: 'technology',
    status: 'live' as const,
    address: '123 Business Ave, Suite 100, City, State 12345'
  }
}

export default async function EditCustomerPage({
  params
}: {
  params: { id: string }
}) {
  const customer = await getCustomer(params.id)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Customer</h1>
      <CustomerForm customer={customer} />
    </div>
  )
} 