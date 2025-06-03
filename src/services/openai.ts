
import OpenAI from 'openai';

// TODO: Replace with your actual OpenAI API key
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

export interface ImageGenerationRequest {
  prompt: string;
  rawImages?: File[];
  referenceImage?: File;
  restaurantInfo?: {
    name: string;
    cuisineType: string;
    brandPersonality: string;
  };
}

export interface GeneratedImageResult {
  url: string;
  caption: string;
  hashtags: string[];
}

export const generateFoodImage = async (request: ImageGenerationRequest): Promise<GeneratedImageResult> => {
  try {
    // Convert uploaded images to base64 for analysis (if needed)
    const imageAnalysis = request.rawImages ? await analyzeUploadedImages(request.rawImages) : '';
    
    // Create a detailed prompt for food image generation
    const enhancedPrompt = createEnhancedPrompt(request.prompt, imageAnalysis, request.restaurantInfo);
    
    console.log('Generating image with prompt:', enhancedPrompt);
    
    // Generate the image using DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "natural"
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error('No image generated');
    }

    // Generate caption and hashtags based on the prompt and restaurant info
    const { caption, hashtags } = await generateCaptionAndHashtags(request.prompt, request.restaurantInfo);

    return {
      url: imageUrl,
      caption,
      hashtags
    };
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image. Please check your API key and try again.');
  }
};

const analyzeUploadedImages = async (images: File[]): Promise<string> => {
  // Convert first image to base64 for analysis
  if (images.length === 0) return '';
  
  const image = images[0];
  const base64 = await convertFileToBase64(image);
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this food image and describe what you see. Focus on the dish, ingredients, presentation, and any details that would help create a professional food photo."
            },
            {
              type: "image_url",
              image_url: {
                url: base64
              }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error analyzing image:', error);
    return '';
  }
};

const createEnhancedPrompt = (userPrompt: string, imageAnalysis: string, restaurantInfo?: any): string => {
  let prompt = "Create a professional, mouth-watering food photograph that would be perfect for restaurant social media. ";
  
  if (imageAnalysis) {
    prompt += `Based on this food description: ${imageAnalysis}. `;
  }
  
  if (userPrompt) {
    prompt += `User's specific request: ${userPrompt}. `;
  }
  
  if (restaurantInfo) {
    prompt += `This is for ${restaurantInfo.name}, a ${restaurantInfo.cuisineType} restaurant with a ${restaurantInfo.brandPersonality} personality. `;
  }
  
  prompt += "The image should be high-quality, well-lit, appetizing, and suitable for social media marketing. Focus on making the food look irresistible with professional food photography techniques.";
  
  return prompt;
};

const generateCaptionAndHashtags = async (prompt: string, restaurantInfo?: any): Promise<{ caption: string; hashtags: string[] }> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a social media expert for restaurants. Create engaging captions and hashtags for food posts. ${
            restaurantInfo ? `The restaurant is ${restaurantInfo.name}, a ${restaurantInfo.cuisineType} restaurant with a ${restaurantInfo.brandPersonality} personality.` : ''
          }`
        },
        {
          role: "user",
          content: `Create a compelling social media caption and 15 relevant hashtags for this food image request: ${prompt}. Return the response in JSON format with "caption" and "hashtags" fields.`
        }
      ],
      max_tokens: 500
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from OpenAI');

    try {
      const parsed = JSON.parse(content);
      return {
        caption: parsed.caption || "Delicious food that speaks for itself! 🍽️",
        hashtags: parsed.hashtags || ["food", "delicious", "restaurant", "foodie", "yummy"]
      };
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        caption: "Fresh, delicious, and made with love! Come taste the difference. 🍽️✨",
        hashtags: ["food", "fresh", "delicious", "restaurant", "foodie", "homemade", "quality", "tasty", "instafood", "foodphotography"]
      };
    }
  } catch (error) {
    console.error('Error generating caption and hashtags:', error);
    return {
      caption: "Delicious food that speaks for itself! 🍽️",
      hashtags: ["food", "delicious", "restaurant", "foodie", "yummy"]
    };
  }
};

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
