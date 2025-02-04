import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const updates = await request.json()
    
    // This would be your database call
    console.log('Updating product:', { id, ...updates })

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return the updated product
    // In a real app, this would be the product from your database
    return NextResponse.json({ 
      id,
      ...updates
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
} 