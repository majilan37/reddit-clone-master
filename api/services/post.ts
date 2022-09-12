import { Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { CommentModel } from "../schema/comment";
import { CreatePostInput, GetPostInput, Post, PostModel } from "../schema/post";
import { Subreddit, SubredditModel } from "../schema/subreddit";
import { UserModel } from "../schema/user";
import { Context } from "../types";

class PostService {
  // * Get All posts
  async posts() {
    try {
      const posts = await PostModel.find().lean().sort({
        createdAt: -1,
      });
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error("Server Error");
    }
  }

  // * Get Single Post
  async post(input?: GetPostInput) {
    try {
      const post = await PostModel.findById(input?._id ?? "");

      return post;
    } catch (err) {
      console.log(err);
      throw new Error("Server Error");
    }
  }

  async createPost(input: CreatePostInput, { user }: Context): Promise<Post> {
    try {
      let subreddit = await SubredditModel.findOne({ topic: input.topic });
      if (!subreddit) {
        subreddit = await SubredditModel.create({ topic: input.topic });
      }
      const post = await PostModel.create({
        ...input,
        subredditId: subreddit._id,
        user: new mongoose.Types.ObjectId(user._id),
      });

      const savedPost = await PostModel.findById(post._id).lean();

      return savedPost as unknown as Post;
    } catch (err) {
      console.log(err);
      throw new Error("Couldn't create a post");
    }
  }

  async subredditList(input: Post): Promise<Ref<Subreddit[] | void>> {
    try {
      const subredditList = await SubredditModel.find({
        _id: input.subredditId ?? (input as any)._doc.subredditId,
      });

      return subredditList;
    } catch (err) {
      console.log(err);
      throw new Error("Couldn't get the subreddit list");
    }
  }

  // * Find a user
  async user(post: Post) {
    try {
      const user = await UserModel.findById(
        post.user ?? (post as any)._doc.user
      ).lean();
      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Couldn't get the user");
    }
  }

  // * Find comments
  async comments(post: Post) {
    console.log("post comments >>", post);

    const comments = await CommentModel.find({
      postId: (post as any)._doc._id,
    });

    return comments;
  }
}

export default PostService;
