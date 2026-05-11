import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
/* 
type CreateUserProps = {
    name: string;
    email: string;
}
*/
export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        /*
        const user = await prisma.user.create({
            data
        })

        return user
        */
        return await prisma.user.create({ data })
    } catch (error) {
        // console.log('Error creating user:', error)
        // console.log('Error Code:', error.code)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                console.error('Error: Email already exists.')
                return false
            }
        }
    }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try {
        await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        })
        return true
    } catch (error) {
        console.error('Error creating users:', error)
        return false
    }
}