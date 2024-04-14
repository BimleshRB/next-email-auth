import { connectDb } from "@/dbConfig/dbCongig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}