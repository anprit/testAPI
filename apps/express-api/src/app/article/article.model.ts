export interface ArticleDto {
  id: string;
  title: string;
  slug: string;
  published_at: Date;
}

export interface ArticlePaginationDto {
  data: ArticleDto[]
  metadata: {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    prevPage: number;
    nextPage: number;
  }
}
