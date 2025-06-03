
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Store, Globe, MessageSquare } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    restaurantType: "",
    cuisineType: "",
    brandPersonality: "",
    targetAudience: "",
    website: "",
    instagram: "",
    facebook: "",
    twitter: "",
    specialties: "",
    description: ""
  });

  const totalSteps = 3;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // TODO: Save onboarding data to Supabase
    console.log("Onboarding completed:", formData);
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Store className="h-6 w-6 text-orange-600" />
                <CardTitle>Tell us about your restaurant</CardTitle>
              </div>
              <CardDescription>
                Help us understand your business so we can create content that matches your brand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Restaurant Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Mario's Italian Kitchen"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="restaurantType">Restaurant Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("restaurantType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fine-dining">Fine Dining</SelectItem>
                      <SelectItem value="casual-dining">Casual Dining</SelectItem>
                      <SelectItem value="fast-casual">Fast Casual</SelectItem>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="food-truck">Food Truck</SelectItem>
                      <SelectItem value="bar">Bar & Grill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="cuisineType">Cuisine Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("cuisineType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="fusion">Fusion</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Restaurant Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your restaurant's atmosphere, specialties, and what makes you unique..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        );
      
      case 2:
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="h-6 w-6 text-purple-600" />
                <CardTitle>Define your brand voice</CardTitle>
              </div>
              <CardDescription>
                This helps us create captions and content that match your restaurant's personality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="brandPersonality">Brand Personality *</Label>
                <Select onValueChange={(value) => handleInputChange("brandPersonality", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How would you describe your brand?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional & Elegant</SelectItem>
                    <SelectItem value="friendly">Friendly & Welcoming</SelectItem>
                    <SelectItem value="fun">Fun & Playful</SelectItem>
                    <SelectItem value="sophisticated">Sophisticated & Upscale</SelectItem>
                    <SelectItem value="cozy">Cozy & Homestyle</SelectItem>
                    <SelectItem value="trendy">Trendy & Modern</SelectItem>
                    <SelectItem value="authentic">Authentic & Traditional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  placeholder="Families, young professionals, food enthusiasts..."
                />
              </div>
              
              <div>
                <Label htmlFor="specialties">Signature Dishes & Specialties</Label>
                <Textarea
                  id="specialties"
                  value={formData.specialties}
                  onChange={(e) => handleInputChange("specialties", e.target.value)}
                  placeholder="List your most popular dishes, signature items, or specialties..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        );
      
      case 3:
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="h-6 w-6 text-blue-600" />
                <CardTitle>Connect your online presence</CardTitle>
              </div>
              <CardDescription>
                Optional: Add your social media and website links to help us create better content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://yourrestaurant.com"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange("instagram", e.target.value)}
                    placeholder="@yourrestaurant"
                  />
                </div>
                
                <div>
                  <Label htmlFor="facebook">Facebook Page</Label>
                  <Input
                    id="facebook"
                    value={formData.facebook}
                    onChange={(e) => handleInputChange("facebook", e.target.value)}
                    placeholder="facebook.com/yourrestaurant"
                  />
                </div>
                
                <div>
                  <Label htmlFor="twitter">Twitter Handle</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                    placeholder="@yourrestaurant"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Welcome to RestoGenie</DialogTitle>
          <div className="flex items-center space-x-2 mt-2">
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          {renderStep()}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={handleNext} className="bg-orange-600 hover:bg-orange-700">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-orange-600 hover:bg-orange-700">
              Complete Setup
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
