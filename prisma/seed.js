const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
      where: { email: 'alice@prisma.io' },
      update: {},
      create: {
        email: 'alice@prisma.io',
        username: 'Alice123',
        password: 'xxooxx',
        profile: {
            create: 
                {
                   firstName: 'Alice',
                   lastName: 'Nelson',
                   age: 22,
                   pictureUrl: 'https://randomuser.me/api/portraits/women/50.jpg' 
                }
          },
        post: {
          create:{
            title: "secrete life of cats",
            content: "Ijust think there neat",
            imageURL: 'https://randomuser.me/api/portraits/women/50.jpg',
            publishedAt: new Date(Date.now())
          }
        }
      },
    })
  
    const bob = await prisma.user.upsert({
      where: { email: 'bob@prisma.io' },
      update: {},
      create: {
        email: 'bob@prisma.io',
        username: 'Bob123',
        password: 'ooxxoo',
        profile: {
            create: 
                {
                   firstName: 'bob',
                   lastName: 'Belcher',
                   age: 46,
                   pictureUrl: 'https://randomuser.me/api/portraits/lego/8.jpg'
                }
          },
        post: {
          create:{
            title: "secrete life of dogs",
            content: "Ijust think there neater",
            imageURL: 'https://randomuser.me/api/portraits/women/50.jpg',
            publishedAt: new Date(Date.now())
          }
        }
      },
    })
    console.log({ alice, bob })
  }


  main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })