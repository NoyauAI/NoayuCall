import { cache } from 'react';
import { getSession } from './session';
import { headers } from 'next/headers';

/**
 * @returns {Promise<object|null>} O objeto do usuário se a sessão for válida, senão null.
 */
export const getCurrentUser = cache(async () => {
  const headersList = await headers();
  const sessionToken = headersList.get('x-session-token');

  if (!sessionToken) {
    return null;
  }
  const session = await getSession(sessionToken);
  if (!session) {
    return null;
  }
  return session.user;
});