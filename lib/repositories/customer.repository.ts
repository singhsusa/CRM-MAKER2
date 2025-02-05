import { BaseRepository } from './base.repository'
import type { Customer, Prisma } from '@prisma/client'

export class CustomerRepository extends BaseRepository {
  async create(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.prisma.customer.create({
      data
    })
  }

  async update(id: string, data: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>) {
    return this.prisma.customer.update({
      where: { id },
      data
    })
  }

  async findById(id: string) {
    return this.prisma.customer.findUnique({
      where: { id }
    })
  }

  async findAll() {
    return this.prisma.customer.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }
}

export const customerRepository = new CustomerRepository() 