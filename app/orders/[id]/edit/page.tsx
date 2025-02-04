import { OrderForm } from "../../components/order-form"
import { notFound } from "next/navigation"

// This would normally fetch the order data from your API
const getOrder = async (id: string) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      id,
      customerName: 'Acme Corp',
      billingContact: {
        name: 'Jane Smith',
        email: 'jane@acme.com',
        address: '123 Billing St, City, State 12345'
      },
      term: '1-year' as const,
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      products: [
        {
          id: '1',
          productId: 'basic',
          units: 100,
          pricePerUnit: 99.99
        }
      ],
      oneTimeFee: 499.99,
      accountExecutive: 'Bob Wilson',
      status: 'live' as const,
      orderDate: '2024-02-15',
      notes: 'Priority implementation requested'
    }
  } catch (error) {
    return null
  }
}

export default async function EditOrderPage({ params }: { params: { id: string } }) {
  // Ensure params is awaited
  const { id } = await params;
  
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Order</h1>
      <OrderForm order={order} />
    </div>
  )
} 