
import { useState } from 'react';
import { generateFoodImage, ImageGenerationRequest, GeneratedImageResult } from '@/services/openai';

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (request: ImageGenerationRequest): Promise<GeneratedImageResult | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateFoodImage(request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate image';
      setError(errorMessage);
      console.error('Image generation error:', err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateImage,
    isGenerating,
    error,
    clearError: () => setError(null)
  };
};
