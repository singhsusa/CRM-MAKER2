import { BaseRepository } from './base.repository'
import type { Product, Prisma } from '@prisma/client'

export class ProductRepository extends BaseRepository {
  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.prisma.product.create({
      data
    })
  }

  async update(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) {
    return this.prisma.product.update({
      where: { id },
      data
    })
  }

  async findById(id: string) {
    return this.prisma.product.findUnique({
      where: { id }
    })
  }

  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }
}

export const productRepository = new ProductRepository() 