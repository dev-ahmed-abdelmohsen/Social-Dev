import { VideosGrid } from '@/components/videos-grid';

export default function ChannelPage({ params }: { params: { channelId: string } }) {
  // We get the channelId from the URL params as before.
  const channelId = params.channelId;

  return (
    <div className="container mx-auto min-h-screen max-w-7xl p-4 sm:p-6 lg:p-8">
      <header className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Channel Videos
          </h1>
          <p className="mt-1 max-w-2xl text-sm sm:text-base text-muted-foreground">
            Showing all videos for channel: <span className="font-semibold text-primary">{decodeURIComponent(channelId)}</span>
          </p>
      </header>
      <main>
        {/* VideosGrid will handle its own data fetching, loading, and error states */}
        <VideosGrid channelId={channelId} />
      </main>
    </div>
  );
}
