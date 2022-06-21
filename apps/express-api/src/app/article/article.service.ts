import {ArticleDto} from "./article.model";
import {Article, IArticle} from "./article.schema";

export class ArticleService {

  static async getAll(): Promise<ArticleDto[]> {
    const articles: IArticle[] | void = await Article.find().catch(console.log);

    return (articles || []).map((articles: IArticle) => ({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      published_at: articles.published_at
    }))
  }

  static async get(id: string): Promise<ArticleDto> {
    const article: IArticle | void = await Article.findOne({id}).catch(console.log);
    if (article) {
      return {id: article.id, title: article.title, slug: article.slug, published_at: article.published_at}
    }
    return null
  }

  static async create(article: ArticleDto): Promise<ArticleDto> {
    const newArticle: IArticle | void = await Article.create(article).catch(console.log);
    if (newArticle) {
      return {id: newArticle?.id, title: newArticle?.title, slug: newArticle?.slug, published_at: newArticle?.published_at};
    }
    return null;
  }

  static async delete(id: string): Promise<boolean> {
    const deletedArticle: IArticle | void = await Article.findOneAndDelete({id}).catch(console.log);
    return !!deletedArticle;
  }
}
