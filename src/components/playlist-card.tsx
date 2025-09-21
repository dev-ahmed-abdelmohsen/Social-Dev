import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Playlist } from "@/lib/types";
import { Clapperboard } from "lucide-react";

export function PlaylistCard({ playlist, onClick }: { playlist: Playlist; onClick: () => void; }) {
  return (
    <Card
      onClick={onClick}
      className="flex cursor-pointer flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-video">
        <Image
          src={playlist.thumbnail}
          alt={`Thumbnail for ${playlist.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2 text-base">{playlist.title}</CardTitle>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
            <Clapperboard className="h-4 w-4" />
            <span>{playlist.videoCount} videos</span>
        </div>
      </CardFooter>
    </Card>
  );
}
