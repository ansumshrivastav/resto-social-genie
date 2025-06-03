
export const isValidOpenAIKey = (apiKey: string): boolean => {
  return apiKey && apiKey !== 'YOUR_OPENAI_API_KEY_HERE' && apiKey.startsWith('sk-');
};

export const getAPIKeyStatus = (): { isValid: boolean; message: string } => {
  const apiKey = 'YOUR_OPENAI_API_KEY_HERE'; // This should match what's in openai.ts
  
  if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY_HERE') {
    return {
      isValid: false,
      message: 'OpenAI API key not configured. Please add your API key in src/services/openai.ts'
    };
  }
  
  if (!apiKey.startsWith('sk-')) {
    return {
      isValid: false,
      message: 'Invalid OpenAI API key format. API keys should start with "sk-"'
    };
  }
  
  return {
    isValid: true,
    message: 'API key configured correctly'
  };
};
