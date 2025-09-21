export interface Video {
  id: string; // Mapped from videoId
  title: string;
  thumbnail: string;
  publishedAt: string;
}

// Raw types from the API before mapping
export interface ApiVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}
