import React from 'react';
import { format } from 'date-fns';
import { FileText, Mic, Image, Share2 } from 'lucide-react';
import type { JournalEntry as JournalEntryType } from '../types';
import { AIInsights } from './AIInsights';

interface JournalEntryProps {
  entry: JournalEntryType;
}

export const JournalEntry: React.FC<JournalEntryProps> = ({ entry }) => {
  const getIcon = () => {
    switch (entry.type) {
      case 'audio':
        return <Mic className="text-blue-500" />;
      case 'image':
        return <Image className="text-green-500" />;
      case 'social':
        return <Share2 className="text-purple-500" />;
      default:
        return <FileText className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getIcon()}
          <h3 className="text-xl font-semibold">{entry.title}</h3>
        </div>
        <div className="flex items-center gap-4">
          {entry.source && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              From {entry.source}
            </span>
          )}
          <span className="text-sm text-gray-500">
            {format(entry.date, 'MMM dd, yyyy')}
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{entry.content}</p>

      {entry.extractedText && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold mb-2">Extracted Text</h4>
          <p className="text-gray-600">{entry.extractedText}</p>
        </div>
      )}

      {entry.audioUrl && (
        <audio controls className="w-full mb-4">
          <source src={entry.audioUrl} type="audio/webm" />
        </audio>
      )}

      {entry.imageUrls && entry.imageUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {entry.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Journal image ${index + 1}`}
              className="rounded-lg w-full h-48 object-cover"
            />
          ))}
        </div>
      )}

      {entry.aiSummary && entry.aiTags && (
        <AIInsights
          analysis={{
            summary: entry.aiSummary,
            tags: entry.aiTags,
            sentiment: entry.sentiment || 'neutral',
          }}
        />
      )}
    </div>
  );
};