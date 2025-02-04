import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const customer = await request.json()
    
    // This would be your database call
    console.log('Creating customer:', customer)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return the created customer
    return NextResponse.json({ 
      id: crypto.randomUUID(),
      ...customer 
    })
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
} 