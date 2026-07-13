"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ImagePlus, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export function CoverImageUploader() {
  const [image, setImage] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation before wasting a round trip
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP or AVIF images are allowed");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be under 5MB");
      e.target.value = "";
      return;
    }

    // Instant local preview
    const localPreview = URL.createObjectURL(file);
    setImage(localPreview);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "handyman_blog");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.secure_url) {
        setImage(data.secure_url);
        toast.success("Cover image uploaded");
      } else {
        setImage("");
        toast.error(data.error || "Upload failed");
      }
    } catch (err) {
      setImage("");
      toast.error("Upload failed");
    } finally {
      URL.revokeObjectURL(localPreview);
      setIsUploading(false);
      e.target.value = ""; // allow re-selecting the same file
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="cover-image"
        className="relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-input bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        {image ? (
          <img
            src={image}
            alt="Cover preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <ImagePlus className="h-6 w-6" />
            <span className="text-sm">Click to upload cover image</span>
          </div>
        )}

        {/* Spinner overlay while uploading */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {/* Remove button, hidden while uploading */}
        {image && !isUploading && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setImage("");
            }}
            className="absolute right-2 top-2 rounded-full bg-background/80 p-1 hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <input
          id="cover-image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}