import { NextResponse } from 'next/server'
import { productRepository } from '@/lib/repositories/product.repository'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const product = await productRepository.create(data)
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
} 