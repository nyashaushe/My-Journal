import { HfInference } from '@huggingface/inference';
import { Configuration, OpenAIApi } from 'openai';
import type { AIAnalysis } from '../types';

const hf = new HfInference(process.env.VITE_HUGGINGFACE_TOKEN);
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.VITE_OPENAI_API_KEY,
  })
);

export const analyzeText = async (text: string): Promise<AIAnalysis> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "Analyze the following journal entry and provide a brief summary, relevant tags, and sentiment analysis."
      }, {
        role: "user",
        content: text
      }]
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    return {
      summary: analysis.summary,
      tags: analysis.tags,
      sentiment: analysis.sentiment,
    };
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw error;
  }
};

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const response = await openai.audio.transcriptions.create({
      file: audioBlob,
      model: "whisper-1",
    });
    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};