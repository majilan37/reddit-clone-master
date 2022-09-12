import { Comment, CommentModel, CreateCommentInput } from "../schema/comment";
import { UserModel } from "../schema/user";
import { Context } from "../types";

class CommentService {
  async createComment(input: CreateCommentInput, context: Context) {
    const comment = await CommentModel.create({
      ...input,
      user: context.user._id,
    });

    return comment;
  }

  async user(comment: Comment) {
    console.log("comment user >>", comment);
    const user = await UserModel.findById((comment as any)._doc.user);

    return user;
  }
}

export default CommentService;
