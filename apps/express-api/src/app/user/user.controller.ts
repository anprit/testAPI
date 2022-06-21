import {UserService} from "./user.service";
import * as dayjs from "dayjs";

export class UserController {

  static async create(req, res) {
    try {
      return res.status(200).json(await UserService.create(req.body));
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err.message});
    }
  }

  static async login(req, res) {
    try {
      const jwt = await UserService.login(req.body);
      res.cookie("secureCookie", JSON.stringify({
        token: jwt
      }), {
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate(),
      });
      return res.status(200).json();
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err.message});
    }
  }
}
