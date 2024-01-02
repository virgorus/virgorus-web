import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        if (user && user.password) {
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) {
                return NextResponse.json(exclude(user, ["password"]), { status: 200 });
            } else {
                return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
function exclude(user: any, keys: string[]) {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }