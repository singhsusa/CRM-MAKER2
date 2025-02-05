import { NextResponse } from 'next/server'
import { customerRepository } from '@/lib/repositories/customer.repository'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const updates = await request.json()
    
    const customer = await customerRepository.update(id, updates)
    
    return NextResponse.json(customer)
  } catch (error) {
    console.error('Error updating customer:', error)
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    )
  }
} 