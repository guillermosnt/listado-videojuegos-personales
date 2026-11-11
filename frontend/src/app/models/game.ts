export interface Game {
  id: number;
  name: string;
  platform: string;
  imageUrl: string;
  status: 'PENDING' | 'PLAYING' | 'COMPLETED';
}
