import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { comparePassword } from '@/lib/password';
import { createSession } from '@/lib/session';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    const { signedToken, expires } = await createSession(user.id);

    const cookieStore = await cookies();
    cookieStore.set('connect', signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      expires: expires,
    });

    return NextResponse.json({ message: 'Login bem-sucedido!' });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Ocorreu um erro interno.' }, { status: 500 });
  }
}