import AppDataSource from "../data-source";
import { User } from '../entities/user.entity'
import {IUserRequest, IUserUpdate} from "../interfaces/users/index"
import { hash } from 'bcrypt'
import { AppError } from "../errors/appError";


const createUserService = async({name, email, isAdm, password}: IUserRequest): Promise<User> => {

    const userRepository = AppDataSource.getRepository(User)
    const emailDb = await userRepository.findOneBy({email})

    if(emailDb){
        throw new AppError('Already exists', 400)
    }

    if(!password){
        throw new AppError('Password is missing', 400)
    }

    const hashedPassword = await hash(password, 10)

    const user = userRepository.create({
        name,
        email,
        isAdm,
        password: hashedPassword
    })

    await userRepository.save(user)

    return user
}

const listUsersService = async(): Promise<User[]> => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    return users
}

const updateUserService = async ({name, email, password}: IUserUpdate, id: string): Promise<User | Array<string | number>> => {
    const userRepository = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOneBy({
        id
    })

    if(!findUser){
        throw new AppError("User not found", 404)
    }

    await userRepository.update(id,
        {
            name: name ? name : findUser.name,
            email: email ? email : findUser.email,
            password: password ? await hash(password, 10) : findUser.password
        }
        )

    const user = await userRepository.findOneBy({id})

    return user!
}

const softDeleteUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOneBy({ id });

    if(!findUser){
        throw new AppError("error", 404)
    }
    
    if(!findUser?.isActive){
        throw new AppError("error", 400)
    }

    await userRepository.update(id,
        {
            isActive: false
        }
        )

    const user = await userRepository.findOneBy({id})

    return user!
}

export { createUserService, listUsersService, updateUserService, softDeleteUserService }
