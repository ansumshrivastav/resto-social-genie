
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Send, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Download,
  Share2,
  Trash2,
  Plus
} from "lucide-react";
import ChatMessage from "@/components/chat/ChatMessage";
import ImageUploadZone from "@/components/chat/ImageUploadZone";
import GeneratedImageCard from "@/components/chat/GeneratedImageCard";

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

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Welcome to RestoGenie! I'm here to help you create stunning food images for your restaurant's social media. You can upload your raw food photos and I'll transform them into professional, mouth-watering images with engaging captions and hashtags.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const referenceInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && uploadedImages.length === 0) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage || "Generate image from uploaded photos",
      images: uploadedImages.map(file => URL.createObjectURL(file)),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);

    // Simulate AI response with image generation
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I've generated a stunning professional image of your dish! Here's what I created along with an engaging caption and hashtags perfect for your social media.",
        generatedImage: {
          url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=500&fit=crop",
          caption: "🍕 Freshly baked perfection! Our signature wood-fired pizza with house-made sauce, premium mozzarella, and garden-fresh basil. Every bite is a taste of authentic Italian tradition. What's your favorite pizza topping?",
          hashtags: ["#pizza", "#woodfired", "#italian", "#fresh", "#authentic", "#foodie", "#restaurant", "#delicious", "#homemade", "#traditional", "#basil", "#mozzarella", "#foodphotography", "#yummy", "#instafood"]
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
      setUploadedImages([]);
      setReferenceImage(null);
    }, 3000);
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedImages(prev => [...prev, ...files]);
  };

  const handleReferenceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReferenceImage(file);
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Camera className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">RestoGenie AI</h1>
              <p className="text-sm text-gray-600">Food Image Generator</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Sparkles className="h-3 w-3 mr-1" />
            Pro Plan
          </Badge>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-80px)] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isGenerating && (
            <div className="flex justify-start">
              <Card className="max-w-xs">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
                    <span className="text-sm text-gray-600">Generating your image...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Upload Areas */}
        {(uploadedImages.length > 0 || referenceImage) && (
          <div className="mb-4 space-y-3">
            {uploadedImages.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Raw Images ({uploadedImages.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => removeUploadedImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {referenceImage && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Reference Style Image
                </label>
                <div className="relative inline-block">
                  <img
                    src={URL.createObjectURL(referenceImage)}
                    alt="Reference"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <button
                    onClick={() => setReferenceImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <ImageUploadZone onFilesUpload={handleFileUpload} />
            
            <div className="flex flex-col space-y-3 mt-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Add Raw Images
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => referenceInputRef.current?.click()}
                  className="flex-1"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Add Reference Style
                </Button>
              </div>

              <div className="flex space-x-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe how you want your food image to look, or just upload images and let AI work its magic..."
                  className="flex-1 min-h-[60px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isGenerating}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFileUpload(files);
              }}
              className="hidden"
            />
            <input
              ref={referenceInputRef}
              type="file"
              accept="image/*"
              onChange={handleReferenceUpload}
              className="hidden"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
