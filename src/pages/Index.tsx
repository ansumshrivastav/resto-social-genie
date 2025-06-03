import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Sparkles, Share2, Zap, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/auth/AuthModal";
import OnboardingModal from "@/components/onboarding/OnboardingModal";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/chat");
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Camera className="h-8 w-8 text-orange-600" />
          <span className="text-2xl font-bold text-gray-900">RestoGenie</span>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Button onClick={() => navigate("/chat")}>
              Go to Chat
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setShowAuthModal(true)}>
                Sign In
              </Button>
              <Button onClick={handleGetStarted}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Food Photography
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Food Photos Into 
            <span className="text-orange-600"> Social Media Gold</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate stunning, professional-quality food images for your restaurant's social media. 
            Upload your dishes, get AI-enhanced photos, captions, and post directly to your social channels.
          </p>
          <Button size="lg" onClick={handleGetStarted} className="bg-orange-600 hover:bg-orange-700">
            Start Creating Amazing Food Photos
            <Camera className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>AI Image Enhancement</CardTitle>
              <CardDescription>
                Upload your raw food photos and watch our AI transform them into professional, mouth-watering images
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Smart Captions & Hashtags</CardTitle>
              <CardDescription>
                Get engaging, brand-aligned captions with trending hashtags tailored to your restaurant's personality
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Direct Social Posting</CardTitle>
              <CardDescription>
                Connect your social media accounts and post directly to Instagram, Facebook, and Twitter with one click
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="text-2xl font-bold">$0<span className="text-sm font-normal">/month</span></div>
                <CardDescription>Perfect for trying out our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ 5 AI-generated images/month</li>
                  <li>✓ Basic captions</li>
                  <li>✓ Image gallery</li>
                  <li>✗ Social media posting</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">Start Free</Button>
              </CardContent>
            </Card>

            <Card className="border-orange-200 shadow-lg">
              <CardHeader>
                <Badge className="mb-2 bg-orange-600">Most Popular</Badge>
                <CardTitle>Pro</CardTitle>
                <div className="text-2xl font-bold">$29<span className="text-sm font-normal">/month</span></div>
                <CardDescription>For active restaurants</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ 100 AI-generated images/month</li>
                  <li>✓ Advanced captions & hashtags</li>
                  <li>✓ Social media posting</li>
                  <li>✓ Chat history (90 days)</li>
                </ul>
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">Start Pro Trial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-2xl font-bold">$99<span className="text-sm font-normal">/month</span></div>
                <CardDescription>For restaurant chains</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Unlimited images</li>
                  <li>✓ Team collaboration</li>
                  <li>✓ Analytics dashboard</li>
                  <li>✓ Priority support</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Index;
