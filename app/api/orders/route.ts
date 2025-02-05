import { NextResponse } from 'next/server'
import { orderRepository } from '@/lib/repositories/order.repository'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const order = await orderRepository.create(data)
    
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
} 