import {ArticleDto, ArticlePaginationDto} from "./article.model";
import {Article, IArticle} from "./article.schema";
import validateSlug from "../helpers/validateSlug";
import {PaginationModel} from "mongoose-paginate-ts";

export class ArticleService {

  static async getAll(showHidedRecords): Promise<ArticleDto[]> {
    const options = {
      private: false
    };
    options.private = !!showHidedRecords;

    const articles: IArticle[] | void = await Article.find(options).catch(console.log);

    return (articles || []).map((articles: IArticle) => ({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      published_at: articles.published_at,
      private: articles.private
    }))
  }

  static async get(id: string): Promise<ArticleDto> {
    const article: IArticle | void = await Article.findOne({id}).catch(console.log);
    if (article) {
      return {
        id: article.id,
        title: article.title,
        slug: article.slug,
        published_at: article.published_at,
        private: article.private
      }
    }
    return null
  }

  static async published(limit: string, page: string): Promise<ArticlePaginationDto> {
    const pagLimit = limit ? limit : 10;
    const pagPage = page ? page : 1;

    const paginationOptions = {
      query: {published_at: {$lte: new Date()}},
      limit: pagLimit,
      page: pagPage
    }
    const articles: PaginationModel<IArticle> | void = await Article.paginate(paginationOptions).catch(console.log);

    if (articles && articles?.docs.length) {
      return {
        data: articles.docs.map((articles: IArticle) => ({
          id: articles.id,
          title: articles.title,
          slug: articles.slug,
          published_at: articles.published_at,
          private: articles.private
        })),
        metadata: {
          totalDocs: articles.totalDocs,
          limit: articles.limit,
          totalPages: articles.totalPages,
          page: articles.page,
          prevPage: articles.prevPage,
          nextPage: articles.nextPage,
        }
      }
    }
    return null
  }

  static async create(article: ArticleDto): Promise<ArticleDto> {
    if (!validateSlug(article.slug)) {
      throw new Error('Article slug isn\'t valid');
    }
    const newArticle: IArticle | void = await Article.create(article).catch(console.log);
    if (newArticle) {
      return {
        id: newArticle?.id,
        title: newArticle?.title,
        slug: newArticle?.slug,
        published_at: newArticle?.published_at,
        private: newArticle.private
      };
    }
    return null;
  }

  static async delete(id: string): Promise<boolean> {
    const deletedArticle: IArticle | void = await Article.findOneAndDelete({id}).catch(console.log);
    return !!deletedArticle;
  }
}
