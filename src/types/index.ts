export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  audioUrl?: string;
  imageUrls?: string[];
  type: 'text' | 'audio' | 'image' | 'social';
  extractedText?: string;
  aiSummary?: string;
  aiTags?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  source?: string;
}

export interface AIAnalysis {
  summary: string;
  tags: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface SocialImport {
  platform: string;
  content: string;
  date: Date;
  mediaUrls?: string[];
}