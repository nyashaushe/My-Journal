import { useState } from 'react';
import { analyzeText, transcribeAudio } from '../services/aiService';
import { extractTextFromImage } from '../services/ocrService';
import type { JournalEntry } from '../types';

export const useAIProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processEntry = async (entry: JournalEntry): Promise<JournalEntry> => {
    setIsProcessing(true);
    try {
      let textToAnalyze = entry.content;
      let extractedText = '';

      if (entry.type === 'audio' && entry.audioUrl) {
        const response = await fetch(entry.audioUrl);
        const audioBlob = await response.blob();
        const transcription = await transcribeAudio(audioBlob);
        textToAnalyze = transcription;
        entry.content = transcription;
      }

      if (entry.type === 'image' && entry.imageUrls?.[0]) {
        extractedText = await extractTextFromImage(entry.imageUrls[0]);
        textToAnalyze = extractedText;
        entry.extractedText = extractedText;
      }

      const analysis = await analyzeText(textToAnalyze);
      
      return {
        ...entry,
        aiSummary: analysis.summary,
        aiTags: analysis.tags,
        sentiment: analysis.sentiment,
      };
    } catch (error) {
      console.error('Error processing entry:', error);
      return entry;
    } finally {
      setIsProcessing(false);
    }
  };

  return { processEntry, isProcessing };
};