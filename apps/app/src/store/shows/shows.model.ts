export interface Show {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ShowState {
  loading: boolean;
  error: string | null;
  data: Show[];
}