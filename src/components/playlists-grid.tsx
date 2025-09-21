"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ListVideo } from "lucide-react";
import { fetchPlaylists } from "@/lib/api";
import type { Playlist } from "@/lib/types";
import { PlaylistCard } from "./playlist-card";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useToast } from "@/hooks/use-toast";

export function PlaylistsGrid({
  channelId,
  onPlaylistClick,
}: {
  channelId: string;
  onPlaylistClick: (playlist: Playlist) => void;
}) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadPlaylists = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPlaylists(channelId);
        setPlaylists(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Failed to fetch playlists",
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadPlaylists();
  }, [channelId, toast]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/5" />
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

  if (playlists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-24 text-center">
        <ListVideo className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold">No Playlists Found</h3>
        <p className="text-sm text-muted-foreground">This channel doesn't have any public playlists.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          onClick={() => onPlaylistClick(playlist)}
        />
      ))}
    </div>
  );
}
