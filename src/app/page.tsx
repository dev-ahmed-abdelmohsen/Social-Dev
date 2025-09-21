import { ChannelForm } from '@/components/channel-form';
import { Youtube, Facebook, Tv } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 dark">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-4 text-center mb-10">
            <div className="rounded-full bg-primary/10 p-4 border-2 border-primary/20 shadow-lg">
                <Tv className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground">
                Social Explorer
            </h1>
            <p className="text-muted-foreground max-w-sm text-lg">
                Enter a channel or page URL to explore its content.
            </p>
        </div>
        
        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="youtube">
              <Youtube className="mr-2 h-5 w-5" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="facebook" disabled>
              <Facebook className="mr-2 h-5 w-5" />
              Facebook
            </TabsTrigger>
          </TabsList>
          <TabsContent value="youtube" className="mt-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>YouTube Channel</CardTitle>
                <CardDescription>
                  Enter a valid YouTube channel URL to begin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChannelForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
