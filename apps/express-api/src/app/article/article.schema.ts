import {model, Schema, Document} from 'mongoose';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export interface IArticle extends Document {
  id: string;
  title: string;
  slug: string;
  published_at: Date;
}

const ArticleSchema = new Schema<IArticle>({
  id: {type: String, required: true},
  title: {type: String, required: true},
  slug: {type: String, required: true},
  published_at: {type: Date, default: null},
});

ArticleSchema.plugin(mongoosePagination);

export const Article: Pagination<IArticle> = model<IArticle, Pagination<IArticle>>('Article', ArticleSchema);
