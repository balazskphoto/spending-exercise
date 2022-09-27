const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.currency.deleteMany()
    console.log('Deleted records in the currency table')

    await prisma.currency.createMany({
      data: [{
        code: 'USD',
        description: 'US Dollar'
      },
      {
        code: 'HUF',
        description: 'Hungarian Forint'
      }]
    })
    
    console.log('Added default currencies')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
