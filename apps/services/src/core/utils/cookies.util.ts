import { Response } from 'express';

export function getAuthenticationCookie(
  cookieName: string,
  cookieValue: string,
  maxAge: number,
) {
  return `${cookieName}=${cookieValue}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function setCookies(
  response: Response,
  accessToken: string,
  accessExpiration: number,
) {
  response.setHeader('Set-Cookie', [
    getAuthenticationCookie('Authentication', accessToken, accessExpiration),
  ]);
}
