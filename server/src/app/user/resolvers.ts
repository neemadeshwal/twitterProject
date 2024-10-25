import { sendOtp } from "../../utils/nodemailer";
import { redis } from "../../utils/redis/redis";


interface getCredAndSendOtpPayload{
    firstName:string;
    lastName?:string;
    dateOfBirth?:string;
    email:string;
    otp:string;

}

const mutations={

     getCredAndSendOtp:async(parent:any,{payload}:{payload:getCredAndSendOtpPayload},ctx:any)=>{

        const {firstName,lastName,dateOfBirth,email,otp}=payload

        if(firstName||email){
            throw new Error("Please provide required credentials")
        }
        const data={
            email,firstName,lastName,dateOfBirth
        }
        const expiryTime=60*60*24

       await  redis.set(`unverifiedUser/:${email}`,JSON.stringify(data),"EX",expiryTime)

       const otpsend=await sendOtp(email,otp)

       console.log(otpsend)

       return {email}




       
        
        

    }
}

export const resolvers={mutations}