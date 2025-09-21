"use client";

import { useEffect, useState } from "react";
import { AlertCircle, VideoIcon } from "lucide-react";
import { fetchUploads } from "@/lib/api";
import type { Video } from "@/lib/types";
import { VideoCard } from "./video-card";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useToast } from "@/hooks/use-toast";

export function VideosGrid({ channelId }: { channelId: string; }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchUploads(channelId);
        setVideos(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
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
        <p className="text-sm text-muted-foreground">Could not find any uploaded videos for this channel, or the server took too long to respond.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
