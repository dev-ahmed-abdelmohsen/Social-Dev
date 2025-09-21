"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Loader2 } from "lucide-react";
import { fetchPlaylistVideos } from "@/lib/api";
import type { Playlist, Video } from "@/lib/types";
import { VideoCard } from "./video-card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useToast } from "@/hooks/use-toast";

export function VideoModal({
  playlist,
  onClose,
}: {
  playlist: Playlist | null;
  onClose: () => void;
}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (playlist) {
      const loadVideos = async () => {
        setIsLoading(true);
        setError(null);
        setVideos([]);
        try {
          const data = await fetchPlaylistVideos(playlist.id);
          setVideos(data);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
          setError(errorMessage);
          toast({
            variant: "destructive",
            title: "Failed to fetch playlist videos",
            description: errorMessage,
          });
        } finally {
          setIsLoading(false);
        }
      };
      loadVideos();
    }
  }, [playlist, toast]);

  const open = !!playlist;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="flex h-full max-h-[90vh] w-full max-w-4xl flex-col">
        {playlist && (
          <DialogHeader>
            <DialogTitle className="text-2xl">{playlist.title}</DialogTitle>
            <DialogDescription>
              {playlist.videoCount} videos in this playlist.
            </DialogDescription>
          </DialogHeader>
        )}
        <div className="min-h-0 flex-1">
          <ScrollArea className="h-full pr-6">
            {isLoading && (
              <div className="flex items-center justify-center p-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {error && !isLoading && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
             {!isLoading && !error && videos.length === 0 && (
                 <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-24 text-center">
                    <h3 className="text-lg font-semibold">No Videos in Playlist</h3>
                    <p className="text-sm text-muted-foreground">This playlist appears to be empty.</p>
                </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
