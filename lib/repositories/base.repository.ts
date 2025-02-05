import { prisma } from '@/lib/prisma'

export class BaseRepository {
  protected prisma = prisma
} 