import { CreateUserInput, LoginUserInput, UserModel } from "../schema/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "../types";

export class UserService {
  async register(data: CreateUserInput) {
    // * Check if user already exists
    const user = await UserModel.find().findByEmail(data.email);
    if (user) {
      throw new Error("User already exists");
    }

    // * Hash for password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // * Create our user
    const newUser = await UserModel.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(data: LoginUserInput, context: Context) {
    // * Find user by email
    const user = await UserModel.find().findByEmail(data.email).lean();

    if (!user) {
      throw new Error("User not found");
    }

    // * Check if password is correct
    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    // * Generate jwt token
    const token = jwt.sign(user, process.env.JWT_SECRET ?? "", {
      expiresIn: "1d",
    });

    // * Set a cookie for jwt
    context.res.cookie("accesstoken", token, {
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return user;
  }
}
