import { NextResponse } from 'next/server'
import { customerRepository } from '@/lib/repositories/customer.repository'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const customer = await customerRepository.create(data)
    
    return NextResponse.json(customer)
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
} 