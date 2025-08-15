import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSession } from './session';

export function withAuth(handler) {
  return async function (req, ...args) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('connect')?.value;

    if (!sessionToken) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    const session = await getSession(sessionToken);

    if (!session) {
      cookieStore.delete('connect');
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    req.user = session.user;
    req.session = session;

    return handler(req, ...args);
  };
}