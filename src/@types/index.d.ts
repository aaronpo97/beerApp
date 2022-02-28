declare global {
  namespace Express {
    interface Request {
      accessToken?: string;
      refreshToken?: string;
      didTokenRegenerate?: string;
    }
  }
}
