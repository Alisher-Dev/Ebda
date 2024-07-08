export class Pagination {
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
  offset: number;

  constructor(totalItems: number, page?: number | string, limit?: number | string) {
    this.totalItems = totalItems;
    this.limit = limit ? Number(limit) : 15;
    this.page = page ? Number(page) : 1;
    this.offset = (this.page - 1) * this.limit;
    this.totalPages = Math.ceil(this.totalItems / this.limit);
  }
}
