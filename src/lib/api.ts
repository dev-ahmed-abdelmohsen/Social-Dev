
import type { Video, ApiVideo } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

async function apiPost<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store', // Ensure fresh data on each request
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response: ${errorText}`);
      throw new Error(`The server returned an error. Please check the channel URL and try again.`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Fetch error for endpoint ${endpoint}:`, error);
    if (error instanceof Error && error.message.includes('fetch failed')) {
        throw new Error('Could not connect to the server. Please ensure it is running and accessible.');
    }
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('An unknown API error occurred');
  }
}

export const fetchUploads = async (channelId: string): Promise<Video[]> => {
    console.log(`Fetching uploads for channel: ${channelId}`);
    const data = await apiPost<ApiVideo[]>('/uploads', { channelId });
    return data.map(v => ({
      id: v.videoId,
      title: v.title,
      thumbnail: v.thumbnail,
      publishedAt: v.publishedAt,
    }));
};
