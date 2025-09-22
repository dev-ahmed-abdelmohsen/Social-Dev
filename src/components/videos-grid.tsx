"use client";

import { useEffect, useState } from "react";
import { AlertCircle, VideoIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchUploads } from "@/lib/api";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export function VideosGrid({ channelId }: { channelId: string }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use the api library function instead of direct fetch
        const data = await fetchUploads(channelId);
        console.log("Fetched videos:", data);
        setVideos(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred.";
        const userFriendlyError = `${errorMessage} The server might be taking too long to respond. Please try again in a moment.`;
        setError(userFriendlyError);
        toast({
          variant: "destructive",
          title: "Failed to fetch videos",
          description: userFriendlyError,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [channelId, toast]);

  if (isLoading) {
    return (
      <>
        <div className="mb-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-yellow-500/50 bg-yellow-500/10 p-6 text-center">
          <div className="text-yellow-500 animate-spin h-6 w-6 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
            Fetching Videos...
          </h3>
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            This may take a moment as the data is being prepared.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <div className="aspect-video w-full rounded-xl skeleton" />
              <div className="space-y-2">
                <div className="h-4 w-full skeleton" />
                <div className="h-4 w-3/4 skeleton" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-24 text-center">
        <VideoIcon className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold">No Videos Found</h3>
        <p className="text-sm text-muted-foreground">
          Could not find any uploaded videos for this channel, or the server
          took too long to respond.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideoId(video.id)}
            className="border border-border rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
          >
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                priority={index === 0} // Add priority to the first image (LCP)
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-foreground line-clamp-2">
                {video.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedVideoId && (
        <div
          onClick={() => setSelectedVideoId(null)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            className="w-[90%] max-w-4xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <button
              onClick={() => setSelectedVideoId(null)}
              className="absolute -top-10 right-0 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
