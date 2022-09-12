import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Comment } from "../schema/comment";
import { User } from "../schema/user";
import { Post, CreatePostInput, GetPostInput } from "../schema/post";
import { Subreddit } from "../schema/subreddit";
import PostService from "../services/post";
import { Context } from "../types";

@Resolver(() => Post)
export default class PostResolver {
  constructor(private readonly postService: PostService) {
    this.postService = new PostService();
  }

  @Query(() => [Post])
  async posts() {
    return this.postService.posts();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("input") input: GetPostInput) {
    return this.postService.post(input);
  }

  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Arg("input") input: CreatePostInput,
    @Ctx() context: Context
  ): Promise<Post> {
    return this.postService.createPost(input, context);
  }

  @FieldResolver(() => Subreddit)
  async subredditList(@Root() post: Post) {
    return this.postService.subredditList(post);
  }

  @FieldResolver(() => User)
  async user(@Root() post: Post) {
    return this.postService.user(post);
  }

  @FieldResolver(() => Comment)
  async comments(@Root() post: Post) {
    return this.postService.comments(post);
  }
}
