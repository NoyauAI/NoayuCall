import { hashPassword } from '../../../../lib/password';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const registerUserSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  });

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const validationResult = registerUserSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json({
      message: "Invalid input data",
      errors: validationResult.error.flatten().fieldErrors,
    });
  }

  const { name, email, password, confirmPassword } = validationResult.data;

  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json({ message: 'Missing required fields', errors: validationResult.error.flatten().fieldErrors });
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ message: 'Passwords do not match' });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User created successfully', success: true });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }
}