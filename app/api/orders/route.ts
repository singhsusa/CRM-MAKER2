import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const order = await request.json()
    
    // This would be your database call
    console.log('Creating order:', order)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return the created order
    return NextResponse.json({ 
      id: crypto.randomUUID(),
      orderDate: new Date().toISOString(),
      ...order 
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
} 