
import type { Playlist, Video } from './types';

// --- Mock Data ---

const mockPlaylists: Playlist[] = Array.from({ length: 10 }, (_, i) => ({
  id: `playlist_${i + 1}`,
  title: `Awesome Tech Talks Vol. ${i + 1}`,
  thumbnail: `https://picsum.photos/seed/${i + 1}/480/360`,
  videoCount: Math.floor(Math.random() * 50) + 5,
}));

const mockVideos: Video[] = Array.from({ length: 20 }, (_, i) => ({
  id: `video_${i + 1}`,
  title: `Exploring the Wonders of Code, Episode ${i + 1}`,
  thumbnail: `https://picsum.photos/seed/vid${i + 1}/480/360`,
}));


// --- Original API Fetching Logic (commented out) ---

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// async function apiPost<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
//   try {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//       cache: 'no-store', // Ensure fresh data on each request
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error(`API Error Response: ${errorText}`);
//       throw new Error(`The server returned an error. Please check the channel URL and try again.`);
//     }

//     return response.json() as Promise<T>;
//   } catch (error) {
//     console.error(`Fetch error for endpoint ${endpoint}:`, error);
//     if (error instanceof Error && error.message.includes('fetch failed')) {
//         throw new Error('Could not connect to the server. Please ensure it is running and accessible.');
//     }
//     if (error instanceof Error) {
//         throw new Error(error.message);
//     }
//     throw new Error('An unknown API error occurred');
//   }
// }

// --- Mock API Functions ---

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPlaylists = async (channelId: string): Promise<Playlist[]> => {
  console.log(`Fetching MOCK playlists for channel: ${channelId}`);
  await delay(500);
  // To test error state, uncomment the line below
  // throw new Error("This is a mock error for playlists.");
  return Promise.resolve(mockPlaylists);
};

export const fetchUploads = async (channelId: string): Promise<Video[]> => {
    console.log(`Fetching MOCK uploads for channel: ${channelId}`);
    await delay(500);
    // To test error state, uncomment the line below
    // throw new Error("This is a mock error for uploads.");
    return Promise.resolve(mockVideos);
};

export const fetchPlaylistVideos = async (playlistId: string): Promise<Video[]> => {
    console.log(`Fetching MOCK videos for playlist: ${playlistId}`);
    await delay(1000);
    const videoCount = mockPlaylists.find(p => p.id === playlistId)?.videoCount || 10;
     // To test error state, uncomment the line below
    // throw new Error("This is a mock error for playlist videos.");
    return Promise.resolve(mockVideos.slice(0, videoCount));
};
