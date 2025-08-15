import { randomBytes, createHmac, createHash, timingSafeEqual } from 'crypto';
import prisma from './prisma';

const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; //30d
const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error('A variável de ambiente SESSION_SECRET precisa ser definida.');
}

function hashToken(token) {
    return createHash('sha256').update(token).digest('hex');
}

export async function createSession(userId) {
    const sessionId = randomBytes(32).toString('hex');
  
    const signature = createHmac('sha256', SESSION_SECRET)
      .update(sessionId)
      .digest('hex');
  
    const signedToken = `${sessionId}.${signature}`;
  
    const hashedDbToken = hashToken(signedToken);
  
    const expires = new Date(Date.now() + SESSION_DURATION);
  
    await prisma.session.create({
      data: {
        userId,
        sessionToken: hashedDbToken,
        expires,
      },
    });
  
    return { signedToken, expires };
  }
  
  export async function getSession(signedToken) {
    if (!signedToken || !signedToken.includes('.')) {
      return null;
    }

    const [sessionId, signature] = signedToken.split('.');
    if (!sessionId || !signature) {
      return null;
    }
    const expectedSignature = createHmac('sha256', SESSION_SECRET)
      .update(sessionId)
      .digest('hex');
  
    const signatureBuffer = Buffer.from(signature, 'hex');
    const expectedSignatureBuffer = Buffer.from(expectedSignature, 'hex');
  
    if (!timingSafeEqual(signatureBuffer, expectedSignatureBuffer)) {
      console.warn('Alerta de Segurança: Assinatura de sessão inválida. Possível tentativa de adulteração.');
      return null;
    }
  
    const hashedDbToken = hashToken(signedToken);
  
    const session = await prisma.session.findUnique({
      where: { sessionToken: hashedDbToken },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  
    if (!session || session.expires < new Date()) {
      if (session) {
        await prisma.session.delete({ where: { id: session.id } });
      }
      return null;
    }
  
    return session;
  }
  
  export async function deleteSession(signedToken) {
    if (!signedToken) return;
    const hashedDbToken = hashToken(signedToken);
    try {
      await prisma.session.delete({
        where: { sessionToken: hashedDbToken },
      });
    } catch (error) {
      if (error.code !== 'P2025') {
        throw error;
      }
    }
  }