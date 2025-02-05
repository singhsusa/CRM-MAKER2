import { NextResponse } from 'next/server'
import { orderRepository } from '@/lib/repositories/order.repository'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received order data:', data)

    // Validate required fields
    if (!data.customerId) throw new Error('Customer ID is required')
    if (!data.products?.length) throw new Error('At least one product is required')
    
    const order = await orderRepository.create(data)
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 500 }
    )
  }
} 