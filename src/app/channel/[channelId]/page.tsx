import { VideosGrid } from "@/components/videos-grid";
import { validateYouTubeChannelId } from "@/lib/channel-mapping";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function ChannelPage({
  params,
}: {
  params: { channelId: string };
}) {
  // Get the raw input from the resolved URL params and decode it
  const rawChannelInput = decodeURIComponent(params.channelId);
  console.log("[DEBUG] Raw channel input:", rawChannelInput);

  // Validate the YouTube channel ID
  const { channelId, error } = validateYouTubeChannelId(rawChannelInput);
  console.log("[DEBUG] Validated channel ID:", channelId || "Invalid");

  return (
    <div className="container mx-auto min-h-screen max-w-7xl p-4 sm:p-6 lg:p-8">
      <header className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Channel Videos
        </h1>
        <p className="mt-1 max-w-2xl text-sm sm:text-base text-muted-foreground">
          Showing videos for channel:{" "}
          <span className="font-semibold text-primary overflow-hidden text-ellipsis">
            {rawChannelInput}
          </span>
        </p>
      </header>
      <main>
        {error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Invalid Channel ID</AlertTitle>
            <AlertDescription>
              {error}
              <div className="mt-4">
                <p className="font-semibold">
                  Steps to get a valid channel ID:
                </p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>
                    Visit{" "}
                    <a
                      href="https://www.tunepocket.com/youtube-channel-id-finder/?srsltid=AfmBOoprJY3RU6BTSrhRO1lIADFwh1hYHJrlOIPRf2qcyBYods4GDiGg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      TunePocket Channel ID Finder
                    </a>
                  </li>
                  <li>Enter the YouTube channel URL or username</li>
                  <li>Click "Find Channel ID"</li>
                  <li>Copy the YouTube Channel ID (starts with UC)</li>
                  <li>Return here and search using that ID</li>
                </ol>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <VideosGrid channelId={channelId!} />
        )}
      </main>
    </div>
  );
}
