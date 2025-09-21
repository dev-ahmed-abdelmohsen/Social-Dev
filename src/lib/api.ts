
import type { Video, ApiVideo } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

async function apiPost<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store', 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response: ${errorText}`);
      throw new Error(`The server returned an error: ${response.statusText}. Please check the channel URL and try again.`);
    }

    const text = await response.text();
    
    if (!text) {
      console.log("API returned an empty response, likely due to a timeout on the backend.");
      return [] as T;
    }

    return JSON.parse(text) as T;

  } catch (error) {
    console.error(`Fetch error for endpoint ${endpoint}:`, error);
    if (error instanceof Error && error.message.includes('fetch failed')) {
        throw new Error('Could not connect to the server. Please ensure it is running and accessible.');
    }
    throw error;
  }
}

export const fetchUploads = async (channelId: string): Promise<Video[]> => {
    console.log(`Fetching uploads for channel: ${channelId}`);
    const data = await apiPost<ApiVideo[]>('/api/uploads', { channelId });

    if (!Array.isArray(data)) {
      console.error("API did not return an array as expected. Data received:", data);
      return [];
    }

    return data.map(v => ({
      id: v.videoId,
      title: v.title,
      thumbnail: v.thumbnail,
      publishedAt: v.publishedAt,
    }));
};
