import { BaseRepository } from './base.repository'
import type { Order, OrderProduct, Prisma } from '@prisma/client'

export class OrderRepository extends BaseRepository {
  async create(data: {
    customerId: string
    billingContact: {
      name: string
      email: string
      address: string
    }
    term: string
    startDate: Date
    endDate: Date
    oneTimeFee: number
    accountExecutive: string
    status: string
    products: {
      productId: string
      units: number
      pricePerUnit: number
    }[]
  }) {
    return this.prisma.order.create({
      data: {
        customerId: data.customerId,
        billingContact: data.billingContact,
        term: data.term,
        startDate: data.startDate,
        endDate: data.endDate,
        oneTimeFee: data.oneTimeFee,
        accountExecutive: data.accountExecutive,
        status: data.status,
        orderDate: new Date(),
        products: {
          create: data.products.map(product => ({
            productId: product.productId,
            units: product.units,
            pricePerUnit: product.pricePerUnit
          }))
        }
      },
      include: {
        customer: true,
        products: {
          include: {
            product: true
          }
        }
      }
    })
  }

  async update(id: string, data: Partial<{
    billingContact: {
      name: string
      email: string
      address: string
    }
    term: string
    startDate: Date
    endDate: Date
    oneTimeFee: number
    accountExecutive: string
    status: string
    products: {
      id?: string
      productId: string
      units: number
      pricePerUnit: number
    }[]
  }>) {
    // First update the order details
    const order = await this.prisma.order.update({
      where: { id },
      data: {
        ...(data.billingContact && { billingContact: data.billingContact }),
        ...(data.term && { term: data.term }),
        ...(data.startDate && { startDate: data.startDate }),
        ...(data.endDate && { endDate: data.endDate }),
        ...(data.oneTimeFee && { oneTimeFee: data.oneTimeFee }),
        ...(data.accountExecutive && { accountExecutive: data.accountExecutive }),
        ...(data.status && { status: data.status })
      }
    })

    // If products are being updated
    if (data.products) {
      // Delete existing products
      await this.prisma.orderProduct.deleteMany({
        where: { orderId: id }
      })

      // Create new products
      await this.prisma.orderProduct.createMany({
        data: data.products.map(product => ({
          orderId: id,
          productId: product.productId,
          units: product.units,
          pricePerUnit: product.pricePerUnit
        }))
      })
    }

    return this.findById(id)
  }

  async findById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        products: {
          include: {
            product: true
          }
        }
      }
    })
  }

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        products: {
          include: {
            product: true
          }
        }
      }
    })
  }
}

export const orderRepository = new OrderRepository() 