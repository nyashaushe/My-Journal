import { createWorker } from 'tesseract.js';

export const extractTextFromImage = async (imageUrl: string): Promise<string> => {
  try {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(imageUrl);
    await worker.terminate();
    return text;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw error;
  }
};