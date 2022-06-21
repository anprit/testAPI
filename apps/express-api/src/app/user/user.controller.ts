import {UserService} from "./user.service";

export class UserController {

  static async create(req, res) {
    try {
      return res.status(200).json(await UserService.create(req.body));
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err.message});
    }
  }
}
