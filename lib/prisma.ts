import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, type PrismaClient as PrismaClientType } from '@/generated/prisma/client'

const connectionString = process.env.DATABASE_URL

let prismaClient: PrismaClientType | undefined

if (connectionString) {
  prismaClient = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  }) as PrismaClientType
}

export const db = prismaClient
