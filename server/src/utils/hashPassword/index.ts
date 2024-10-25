import bcryptjs from "bcryptjs"
import { SALT_ROUNDS } from "../constants"


export async function hashPassword(password:string) {

    const salt=await bcryptjs.genSalt(Number(SALT_ROUNDS))
    
    const hashedPassword=bcryptjs.hash(password,salt)

    return hashedPassword
}