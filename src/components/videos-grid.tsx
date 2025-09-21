
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
      <>
        <div className="mb-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-yellow-500/50 bg-yellow-500/10 p-6 text-center">
            <div className="text-yellow-500 animate-spin h-6 w-6 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
            <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">Fetching Videos...</h3>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">This may take a moment as the data is being prepared.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
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
