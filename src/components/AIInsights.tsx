import React from 'react';
import { Brain, Tag, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { AIAnalysis } from '../types';

interface AIInsightsProps {
  analysis: AIAnalysis;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ analysis }) => {
  const getSentimentIcon = () => {
    switch (analysis.sentiment) {
      case 'positive':
        return <ThumbsUp className="text-green-500" />;
      case 'negative':
        return <ThumbsDown className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="text-purple-500" />
        <h4 className="font-semibold">AI Insights</h4>
      </div>
      
      <div className="space-y-3">
        <p className="text-sm text-gray-700">{analysis.summary}</p>
        
        <div className="flex flex-wrap gap-2">
          {analysis.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
            >
              <Tag size={14} />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sentiment:</span>
          {getSentimentIcon()}
          <span className="text-sm capitalize">{analysis.sentiment}</span>
        </div>
      </div>
    </div>
  );
};