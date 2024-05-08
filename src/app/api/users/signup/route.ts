import { connect } from "@/dbconfig/dbConfig";
import User from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendMail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({
                error: 'user already exists'
            }, { status: 400 })
        }

        //hashing the password 

        const Salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, Salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        // console.log(savedUser);

        //send email verification link

        await sendMail({email,emailType:"VERIFY",userId: savedUser._id})



        return NextResponse.json({

            message: "User is created",
            success: true,
            savedUser
        }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })

    }
}