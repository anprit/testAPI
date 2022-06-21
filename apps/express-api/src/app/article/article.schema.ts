import {model, Schema, Model, Document} from 'mongoose';

export interface IArticle extends Document {
  id: string;
  title: string;
  slug: string;
  published_at: string;
}

const ArticleSchema = new Schema<IArticle>({
  id: {type: String, required: true},
  title: {type: String, required: true},
  slug: {type: String, required: true},
  published_at: {type: String, default: null},
});

export const Article: Model<IArticle> = model('Article', ArticleSchema);
