import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.album.createMany({
    data: [
        {
            album_id: '6klYyVkzntFBjJch93UB6y'
        },
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })