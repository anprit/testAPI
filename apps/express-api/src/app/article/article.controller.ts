import {ArticleService} from "./article.service";
import * as jwt from "jsonwebtoken";
const JWT_SECRET = 'q1w2e3';

export class ArticleController {

  static async getAll(req, res) {
    try {
      let showHidedRecords = false;
      const cookies = req.cookies;
      if (typeof cookies['secureCookie'] !== 'undefined') {
        const {token} = JSON.parse(cookies['secureCookie']);
        const isVerified = jwt.verify(token, JWT_SECRET);
        if (isVerified) {
          showHidedRecords = true;
        }
      }
      return res.status(200).json(await ArticleService.getAll(showHidedRecords));
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
