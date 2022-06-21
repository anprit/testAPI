import {UserDto} from "./user.model";
import {User, IUser} from "./user.schema";
import * as bcrypt from "bcrypt";
import getLastModelIndex from "../helpers/getLastModelIndex";
//todo move to .env
const bcryptSalt = 10;
export class UserService {

  static async create(user: UserDto): Promise<UserDto> {
    const userExists = await User.findOne({username: user.username});
    if (!userExists) {
      user.id = String(await getLastModelIndex(User) + 1);
      const hashedPw = await bcrypt.hash(String(user.password), bcryptSalt);
      user.password = hashedPw;
      const newUser: IUser | void = await User.create(user).catch(console.log);
      if (newUser) {
        return {id: newUser?.id, username: newUser?.username, password: hashedPw};
      }
      return null;
    }
    throw new Error("User already exists");
  }
}
