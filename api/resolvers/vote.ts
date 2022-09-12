import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import {
  DeleteVoteInput,
  GetVoteForPost,
  Vote,
  VoteInput,
} from "../schema/vote";
import VoteService from "../services/vote";
import { Context } from "../types";

@Resolver(() => Vote)
export default class VoteResolver {
  constructor(private readonly voteService: VoteService) {
    this.voteService = new VoteService();
  }

  // * Get all Votes for a single Post
  @Query(() => [Vote], { nullable: true })
  async votesForPost(@Arg("input") input: GetVoteForPost) {
    return this.voteService.votesForPost(input);
  }

  @Mutation(() => Vote)
  async setUpVote(@Arg("input") input: VoteInput, @Ctx() context: Context) {
    return this.voteService.setUpvote(input, context);
  }

  @Mutation(() => Vote, { nullable: true })
  async deleteVote(@Arg("input") input: DeleteVoteInput) {
    return this.voteService.deleteVote(input);
  }

  @FieldResolver()
  async post(@Root() vote: Vote) {
    return this.voteService.post(vote);
  }

  @FieldResolver()
  async user(@Root() vote: Vote) {
    return this.voteService.user(vote);
  }
}
