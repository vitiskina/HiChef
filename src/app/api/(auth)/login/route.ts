import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prismaDB from '../../../../../libs/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    if (!password) {
      return new NextResponse('Password is required', { status: 400 });
    }

    const user = await prismaDB.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      return new NextResponse('Invalid email or password', { status: 404 });
    }

    const isCorrectPassword = await bcrypt.compare(password, user?.password);

    if (!isCorrectPassword) {
      return new NextResponse('Invalid email or password', { status: 401 });
    }

    return NextResponse.json('Login success');
  } catch (error) {
    console.log('[LOGIN_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
