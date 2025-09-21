import { ChannelForm } from '@/components/channel-form';
import { Youtube } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-lg flex-col items-center rounded-lg border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Youtube className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Tube Explorer
          </h1>
          <p className="text-muted-foreground">
            Enter a YouTube channel URL to explore its content.
          </p>
        </div>
        <div className="mt-8 w-full">
          <ChannelForm />
        </div>
      </div>
    </main>
  );
}
