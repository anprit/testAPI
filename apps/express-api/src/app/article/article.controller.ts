import {ArticleService} from "./article.service";

export class ArticleController {

  static async getAll(req, res) {
    try {
      return res.status(200).json(await ArticleService.getAll());
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err.message});
    }
  }

  static async get(req, res) {
    try {
      return res.status(200).json(await ArticleService.get(req.params?.id));
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err.message});
    }
  }

  static async published(req, res) {
    try {
      return res.status(200).json(await ArticleService.published(req.query?.limit, req.query?.page));
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err.message});
    }
  }

  static async create(req, res) {
    try {
      return res.status(200).json(await ArticleService.create(req.body));
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err.message});
    }
  }

  static async delete(req, res) {
    try {
      return res.status(200).json(await ArticleService.delete(req.params?.id));
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err.message});
    }
  }
}
