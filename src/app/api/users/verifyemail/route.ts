import { connect } from "@/dbconfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiryDate: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({
                status: 'error',
                message: 'Invalid or expired token'
            }, { status: 400 })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiryDate = undefined;
        await user.save();

        return NextResponse.json({  
            status: 'success',
            message: 'Email verified successfully'
        }, { status: 200 })


    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message
        }, { status: 500 })
    }
}