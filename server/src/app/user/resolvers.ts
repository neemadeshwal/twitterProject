import { redis } from "../../utils/redis/redis";


interface getCredAndSendOtpPayload{
    firstName:string;
    lastName?:string;
    dateOfBirth?:string;
    email:string;

}

const mutations={

     getCredAndSendOtp:async(parent:any,{payload}:{payload:getCredAndSendOtpPayload},ctx:any)=>{

        const {firstName,lastName,dateOfBirth,email}=payload

        if(firstName||email){
            throw new Error("Please provide required credentials")
        }
        const data={
            email,firstName,lastName,dateOfBirth
        }
        const expiryTime=600*600*24

       await  redis.set(`unverifiedUser/:${email}`,JSON.stringify(data),"EX",expiryTime)
        
        

    }
}