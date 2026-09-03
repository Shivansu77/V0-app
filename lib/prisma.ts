import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, type PrismaClient as PrismaClientType } from '@/generated/prisma/client'

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL

export const db = connectionString
  ? (new PrismaClient({
      adapter: new PrismaPg({ connectionString }),
    }) as PrismaClientType)
  : undefined
