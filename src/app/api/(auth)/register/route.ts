import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prismaDB from '../../../../../libs/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, specialCode } = body;

    const isCorrectSpecialCode =
      process.env.SPECIAL_CODE?.includes(specialCode);

    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    if (!password) {
      return new NextResponse('Password is required', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaDB.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        role: {
          admin: isCorrectSpecialCode ? true : false,
          user: isCorrectSpecialCode ? false : true,
        },
      },
    });

    if (!user) {
      return new NextResponse(
        'An error occurred while creating your account.',
        { status: 404 }
      );
    }

    return NextResponse.json('Register success');
  } catch (error) {
    console.log('[REGISTER_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
