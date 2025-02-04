import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const updates = await request.json()
    
    // This would be your database call
    console.log('Updating customer:', { id, ...updates })

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return the updated customer
    return NextResponse.json({ 
      id,
      ...updates
    })
  } catch (error) {
    console.error('Error updating customer:', error)
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    )
  }
} 