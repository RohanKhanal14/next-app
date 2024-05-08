import { connect } from "@/dbconfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();  // connecting to database

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody);
        

        const user = await User.findOne({ email })
        console.log(user);
        
        if (!user) {
            return NextResponse.json({
                error: "user doesnot exists",
            }, { status: 400 })
        }
                

        // check password
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({
                error: "Invalid password"
            }, { status: 400 })
        }
        // console.log(validPassword);
        
        // creating token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        // console.log(tokenData);
        
        //create token using jwt

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })

        // console.log(token);
        
        const response = NextResponse.json({
            message: "Login success",
            success: true,
        })
            // console.log(response);
            
        response.cookies.set("token", token, {
            httpOnly: true,
        })  // setting cookie

        console.log(response);
        
        return response;


    } catch (error: any) {
        return NextResponse.json({
            error: error.message,

        }, { status: 400 })
    }

}


