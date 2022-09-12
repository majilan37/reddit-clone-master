import {
  Arg,
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Post } from "../schema/post";
import {
  CreateSubredditInput,
  GetSubredditByTopic,
  Subreddit,
} from "../schema/subreddit";
import { SubredditService } from "../services/subreddit";

@Resolver(() => Subreddit, {})
export default class SubredditResolver {
  constructor(private readonly subredditService: SubredditService) {
    this.subredditService = new SubredditService();
  }

  @Query(() => [Subreddit])
  async subreddits() {
    return this.subredditService.subreddits();
  }

  @Query(() => Subreddit, { nullable: true })
  async subreddit(@Arg("input") input: GetSubredditByTopic) {
    return this.subredditService.subreddit(input);
  }

  @Mutation(() => Subreddit)
  async createSubreddit(
    @Arg("input") input: CreateSubredditInput
  ): Promise<Subreddit> {
    return this.subredditService.createSubreddit(input);
  }

  @FieldResolver(() => Post)
  async posts(@Root() subreddit: Subreddit): Promise<Post[]> {
    return this.subredditService.posts(subreddit);
  }
}
