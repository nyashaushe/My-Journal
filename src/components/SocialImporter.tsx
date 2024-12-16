import React from 'react';
import { Facebook, BrandTiktok } from 'lucide-react';
import { importFromFacebook, importFromTikTok } from '../services/socialImportService';

interface SocialImporterProps {
  onImport: (entries: any[]) => void;
}

export const SocialImporter: React.FC<SocialImporterProps> = ({ onImport }) => {
  const handleFacebookImport = async () => {
    try {
      const entries = await importFromFacebook('dummy-token');
      onImport(entries);
    } catch (error) {
      console.error('Facebook import error:', error);
    }
  };

  const handleTikTokImport = async () => {
    try {
      const entries = await importFromTikTok('dummy-token');
      onImport(entries);
    } catch (error) {
      console.error('TikTok import error:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleFacebookImport}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Facebook size={20} />
        Import from Facebook
      </button>
      <button
        onClick={handleTikTokImport}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        <BrandTiktok size={20} />
        Import from TikTok
      </button>
    </div>
  );
};