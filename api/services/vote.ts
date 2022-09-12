import { Post, PostModel } from "../schema/post";
import { UserModel } from "../schema/user";
import {
  DeleteVoteInput,
  GetVoteForPost,
  Vote,
  VoteInput,
  VoteModel,
} from "../schema/vote";
import { Context } from "../types";

export default class VoteService {
  async setUpvote(input: VoteInput, context: Context) {
    const upvote = await VoteModel.create({
      postId: input.postId,
      userId: context.user._id,
      upvote: input.upvote,
    });

    return upvote;
  }

  async votesForPost(input: GetVoteForPost) {
    const votes = await VoteModel.find({
      postId: input.postId,
    });

    return votes;
  }

  // * Delete vote
  async deleteVote(input: DeleteVoteInput) {
    const vote = await VoteModel.findByIdAndDelete(input._id);

    return vote;
  }

  async post(input: Vote) {
    const post = await PostModel.findById(
      input.postId ?? (input as any)._doc.postId
    ).lean();

    return post;
  }

  async user(input: Vote) {
    console.log(input);
    const user = await UserModel.findById(
      input.userId ?? (input as any)._doc.userId
    );

    console.log(user);

    return user;
  }
}
