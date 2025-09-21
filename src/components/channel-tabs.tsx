"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaylistsGrid } from "@/components/playlists-grid";
import { VideosGrid } from "@/components/videos-grid";
import { VideoModal } from "@/components/video-modal";
import type { Playlist } from "@/lib/types";

export function ChannelTabs({ channelId }: { channelId: string }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleModalClose = () => {
    setSelectedPlaylist(null);
  };

  return (
    <>
      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="all-videos">All Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="playlists" className="mt-6">
          <PlaylistsGrid channelId={channelId} onPlaylistClick={handlePlaylistClick} />
        </TabsContent>
        <TabsContent value="all-videos" className="mt-6">
          <VideosGrid channelId={channelId} />
        </TabsContent>
      </Tabs>
      <VideoModal
        playlist={selectedPlaylist}
        onClose={handleModalClose}
      />
    </>
  );
}
