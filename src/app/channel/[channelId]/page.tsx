import { VideosGrid } from "@/components/videos-grid";

interface PageParams {
  channelId: string;
}

export default async function ChannelPage({ params }: { params: PageParams }) {
  // Safe way to handle channelId, which is now a URL or ID
  const channelIdentifier = params?.channelId
    ? decodeURIComponent(params.channelId)
    : "";

  console.log("[DEBUG] Identifier received on page:", channelIdentifier);

  return (
    <div className="container mx-auto min-h-screen max-w-7xl p-4 sm:p-6 lg:p-8">
      <header className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Channel Videos
        </h1>
        <p className="mt-1 max-w-2xl text-sm sm:text-base text-muted-foreground">
          Showing videos for:{" "}
          <span className="font-semibold text-primary overflow-hidden text-ellipsis">
            {channelIdentifier}
          </span>
        </p>
      </header>
      <main>
        {/* Pass the identifier directly to VideosGrid. The backend will process it. */}
        <VideosGrid channelId={channelIdentifier} />
      </main>
    </div>
  );
}
