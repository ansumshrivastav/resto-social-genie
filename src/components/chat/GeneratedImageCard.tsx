
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  Copy, 
  Heart,
  Instagram,
  Facebook,
  Twitter,
  RefreshCw
} from "lucide-react";

interface GeneratedImage {
  url: string;
  caption: string;
  hashtags: string[];
}

interface GeneratedImageCardProps {
  image: GeneratedImage;
}

const GeneratedImageCard = ({ image }: GeneratedImageCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullCaption = `${image.caption}\n\n${image.hashtags.map(tag => `#${tag}`).join(' ')}`;

  return (
    <Card className="mt-2">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Generated Image */}
          <div className="relative">
            <img 
              src={image.url} 
              alt="Generated food image" 
              className="w-full rounded-lg shadow-md"
            />
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Generated Caption</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(fullCaption)}
              >
                {copied ? (
                  <>
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
              {image.caption}
            </p>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Suggested Hashtags</h4>
            <div className="flex flex-wrap gap-1">
              {image.hashtags.slice(0, 10).map((hashtag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{hashtag}
                </Badge>
              ))}
              {image.hashtags.length > 10 && (
                <Badge variant="outline" className="text-xs">
                  +{image.hashtags.length - 10} more
                </Badge>
              )}
            </div>
          </div>

          {/* Social Media Actions */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Post to Social Media</h4>
            <div className="flex space-x-2">
              <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                <Instagram className="h-4 w-4 mr-2" />
                Instagram
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
          </div>

          {/* Regenerate Option */}
          <Button variant="outline" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate with different style
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneratedImageCard;
