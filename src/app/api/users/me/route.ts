import { getDataFromToken } from "@/helpers/getDataFormToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/model/userModel";


connect();

export async function GET(req: NextRequest) {
    try {
       const userID  = await getDataFromToken(req);
       const allUser = await User.findOne({ _id: userID }).select('-password');
         return NextResponse.json({
              message: 'User found',
              allUser
         })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        },{status: 401})
    }
}