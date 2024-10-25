import nodemailer from "nodemailer"
import { AUTH_EMAIL, AUTH_PASSWORD } from "../constants"


const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:AUTH_EMAIL,
        pass:AUTH_PASSWORD
    }
})





export async function sendOtp(email:string,otp:string) {

    const mailOptions={

        from:AUTH_EMAIL,
        to:email,
        subject:"Verify your account.",
           html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
    }
    try{
        const info=await transporter.sendMail(mailOptions)
        console.log("Otp send successfully",info.messageId)


    }
    catch(error){
        console.log("An error occured.",error)
    }

    
    
}