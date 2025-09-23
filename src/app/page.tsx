"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Youtube } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto flex-1 max-w-7xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full space-y-8 text-center">
          {/* Hero section with icon */}
          <div className="flex flex-col items-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Youtube className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              YouTube Channel Explorer
            </h1>
          </div>

          <p className="text-xl text-muted-foreground">
            Enter a YouTube channel URL to explore videos
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
              <Input
                type="text"
                placeholder="Paste a YouTube channel URL here (e.g., https://www.youtube.com/@yehiatech)"
                value={channelInput}
                onChange={(e) => setChannelInput(e.target.value)}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !channelInput.trim()}
              >
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
            {/* Simple attribution line with heart */}
            <div className="mt-12 text-sm text-muted-foreground text-center">
              Made by{" "}
              <Link
                href="https://ahmed-abd-elmohsen.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition"
              >
                Ahmed Abd Elmohsen
              </Link>{" "}
              ♡
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
