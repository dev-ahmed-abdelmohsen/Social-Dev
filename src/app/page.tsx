import { ChannelForm } from '@/components/channel-form';
import { Youtube, Facebook } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-2 text-center mb-8">
            <div className="flex items-center gap-4">
                <Youtube className="h-10 w-10 text-red-600" />
                <Facebook className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground">
                Social Explorer
            </h1>
            <p className="text-muted-foreground max-w-sm">
                Enter a channel or page URL to explore its content.
            </p>
        </div>
        
        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="youtube">
              <Youtube className="mr-2 h-4 w-4" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="facebook" disabled>
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </TabsTrigger>
          </TabsList>
          <TabsContent value="youtube">
            <Card>
              <CardHeader>
                <CardTitle>YouTube Channel</CardTitle>
                <CardDescription>
                  Enter a valid YouTube channel URL to continue.
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
