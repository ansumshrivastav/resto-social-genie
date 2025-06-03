
import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera } from "lucide-react";

interface ImageUploadZoneProps {
  onFilesUpload: (files: File[]) => void;
}

const ImageUploadZone = ({ onFilesUpload }: ImageUploadZoneProps) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    if (files.length > 0) {
      onFilesUpload(files);
    }
  }, [onFilesUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <Card className="border-2 border-dashed border-gray-300 hover:border-orange-400 transition-colors">
      <CardContent 
        className="p-6 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-orange-100 rounded-full">
            <Upload className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Drag & drop your food images here
            </p>
            <p className="text-xs text-gray-500">
              or click the buttons below to upload
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploadZone;
