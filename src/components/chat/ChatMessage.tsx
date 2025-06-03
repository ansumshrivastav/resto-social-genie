
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, User } from "lucide-react";
import GeneratedImageCard from "./GeneratedImageCard";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  images?: string[];
  generatedImage?: {
    url: string;
    caption: string;
    hashtags: string[];
  };
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex space-x-3 max-w-2xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-orange-600' : 'bg-blue-600'
        }`}>
          {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
        </div>
        
        <div className="flex-1 space-y-2">
          <Card className={isUser ? 'bg-orange-50 border-orange-200' : 'bg-white'}>
            <CardContent className="p-3">
              <p className="text-sm text-gray-800">{message.content}</p>
              
              {message.images && message.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Uploaded ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {message.generatedImage && (
            <GeneratedImageCard 
              image={message.generatedImage}
            />
          )}

          <div className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
