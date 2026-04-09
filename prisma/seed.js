import { prisma } from '../src/lib/prisma.js'
import bcrypt from 'bcrypt'


const hashedPassword = ()=> bcrypt.hashSync('123456', 8)

const userData = [
    { name: 'ADMINPeach', email: 'ADMINpeach@gmail.com', password:hashedPassword(), role:'ADMIN', 
        profileImg:'https://i.pinimg.com/564x/2b/bc/af/2bbcaf8b5d4409e227782d4fe4484b59.jpg' },
    { name: 'Peach', email: 'peach@gmail.com', password:hashedPassword(), role:'USER', 
        profileImg:'https://i.pinimg.com/736x/82/b5/59/82b5591589b5b545726a31fd54728fd4.jpg'},
    { name: 'PeachPatchara', email: 'peachpatch@gmail.com', password:hashedPassword(), role:'USER', 
        profileImg:'https://res.cloudinary.com/piecahcih/image/upload/v1774238072/y9x0bjp2guf5q7ds8lmb.jpg'}
]


async function main() {
    console.log('Clear Data...')

    const modelNames = Object.keys(prisma).filter(
        (key) => !key.startsWith('$') && !key.startsWith('_') && key !== 'constructor'
    )
    await prisma.$transaction(async (tx) => {
        await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;');
        for(const name of modelNames) {
            await tx.$executeRawUnsafe(`TRUNCATE TABLE \`${name}\`;`)
        }
        await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;');
    })

    console.log(`Start seeding...`)
    const createdUsers = await prisma.user.createMany({
        data: userData,
        skipDuplicates: true
    })


    console.log(`Created : ${createdUsers.count} users`)
}

main().then( async ()=>{
    await prisma.$disconnect()
}).catch( async (err)=>{
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
})