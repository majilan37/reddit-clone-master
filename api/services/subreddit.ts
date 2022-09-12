import {
  CreateSubredditInput,
  Subreddit,
  SubredditModel,
} from "../schema/subreddit";
import { Post, PostModel } from "../schema/post";
import { GetSubredditByTopic } from "../schema/subreddit";
import { UserModel } from "../schema/user";

export class SubredditService {
  async createSubreddit(input: CreateSubredditInput) {
    try {
      const subreddit = await SubredditModel.create(input);
      return subreddit;
    } catch (err) {
      console.log(err);
      throw new Error("Couldn't create a subreddit");
    }
  }

  async subreddits() {
    try {
      const subreddits = await SubredditModel.find().lean();
      return subreddits;
    } catch (error) {
      console.log(error);
      throw new Error("Server Error");
    }
  }

  async subreddit(input: GetSubredditByTopic) {
    try {
      const subreddit = await SubredditModel.findOne({
        topic: input.topic,
      }).lean();

      return subreddit;
    } catch (err) {
      console.log(err);
      throw new Error("Server Error");
    }
  }

  // * resolve a posts
  async posts(input: Subreddit) {
    try {
      const posts = await PostModel.find({ subredditId: input._id });

      return posts;
    } catch (err) {
      console.log(err);
      throw new Error("Couldn't get the posts");
    }
  }
}
