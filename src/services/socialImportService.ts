import type { SocialImport } from '../types';

export const importFromFacebook = async (accessToken: string): Promise<SocialImport[]> => {
  // Implementation would require Facebook API integration
  throw new Error('Facebook import not implemented');
};

export const importFromTikTok = async (accessToken: string): Promise<SocialImport[]> => {
  // Implementation would require TikTok API integration
  throw new Error('TikTok import not implemented');
};