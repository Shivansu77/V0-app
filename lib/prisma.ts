import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'
import { PrismaClient, type PrismaClient as PrismaClientType } from '@/generated/prisma/client'

// Support WebSocket in Node.js environment for Neon serverless driver
if (typeof window === 'undefined' && !globalThis.WebSocket) {
  neonConfig.webSocketConstructor = ws
}

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL

function createPrismaClient(): PrismaClientType | undefined {
  if (!connectionString) {
    return undefined
  }

  const isNeon = connectionString.includes('neon.tech')

  if (isNeon) {
    // Production / Remote: Neon Serverless Postgres
    const adapter = new PrismaNeon({ connectionString })
    return new PrismaClient({ adapter }) as PrismaClientType
  }

  // Local Development: Docker Postgres
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter }) as PrismaClientType
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production' && db) {
  globalForPrisma.prisma = db
}
