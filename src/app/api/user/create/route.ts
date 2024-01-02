import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    let errors = [];
    const { name, email, password } =  await req.json()
    if(password.length < 6){
        errors.push('Password length should be more than 8 characters');
        return NextResponse.json({ errors }, { status: 400 });
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword}
        })
        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 })
    }
}

