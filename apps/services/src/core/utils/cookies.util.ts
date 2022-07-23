import { Response } from 'express';

interface ICreateCookie {
  cookieName: string;
  cookieValue: string;
  expiresIn: number;
}

interface ISetCookie extends ICreateCookie {
  response: Response;
}

export function createCookie(data: ICreateCookie) {
  const { cookieName, cookieValue, expiresIn: maxAge } = data;
  return `${cookieName}=${cookieValue}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function setCookie(data: ISetCookie) {
  const { response } = data;
  response.setHeader('Set-Cookie', [createCookie(data)]);
}
