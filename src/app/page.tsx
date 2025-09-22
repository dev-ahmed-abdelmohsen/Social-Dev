"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HomePage() {
  const [channelInput, setChannelInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!channelInput.trim()) return;

    setIsLoading(true);

    // Navigate to the channel page with the entered input
    router.push(`/channel/${encodeURIComponent(channelInput.trim())}`);
  };

  return (
    <div className="container mx-auto min-h-screen max-w-7xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          YouTube Channel Explorer
        </h1>
        <p className="text-xl text-muted-foreground">
          Enter a YouTube channel ID to explore videos
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter YouTube channel ID (e.g., UCGP8LgaWO1lLfFQUQ2BA7rA)"
              value={channelInput}
              onChange={(e) => setChannelInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !channelInput.trim()}>
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>

        <div className="pt-8">
          <div className="text-left bg-muted p-4 rounded-md">
            <p className="font-medium mb-2">
              How to find a YouTube channel ID:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>
                Visit{" "}
                <a
                  href="https://ytlarge.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  YTLarge
                </a>
              </li>
              <li>Scroll down to the "Channel ID Finder" section</li>
              <li>Enter the YouTube channel URL or username</li>
              <li>Click "Find Channel ID"</li>
              <li>Copy the YouTube Channel ID (starts with "UC")</li>
              <li>Paste it in the search box above</li>
            </ol>
            <p className="mt-2 text-sm">
              Example: UCEHvaZ336u7TIsUQ2c6SAeQ (for @DroosOnline4u)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
