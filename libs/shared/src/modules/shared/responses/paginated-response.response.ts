export class PaginatedResponse<T> {
  items: T[];

  count: number;
  
  limit: number;

  skip: number;
}
  