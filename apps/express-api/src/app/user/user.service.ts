import {UserDto, UserLoginDto} from "./user.model";
import {User, IUser} from "./user.schema";
import * as bcrypt from "bcrypt";
import getLastModelIndex from "../helpers/getLastModelIndex";
import * as jwt from "jsonwebtoken";
//todo move to .env
const bcryptSalt = 10;
const JWT_SECRET = 'q1w2e3';
const JWT_EXPIRATION = `${60*60*1000}`;
const JWT_ALGORITHM = 'HS256';

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

  static async login(user: UserLoginDto): Promise<string> {
    const userExists = await User.findOne({username: user.username}, {_id: 0, __v: 0});
    if (userExists) {
      const equal = await bcrypt.compare(user.password, userExists.password);
      if (!equal) {
        throw new Error("Incorrect password");
      }

      return jwt.sign(
        {
          username: userExists.username,
          id: userExists.id,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRATION,
          algorithm: JWT_ALGORITHM,
        },
      );

    }
    throw new Error("User not found");
  }
}
