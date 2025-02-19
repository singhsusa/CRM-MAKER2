import { NextResponse } from 'next/server'
import { orderRepository } from '@/lib/repositories/order.repository'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await orderRepository.findById(params.id)
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const updates = await request.json()
    
    const order = await orderRepository.update(id, updates)
    
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
} 