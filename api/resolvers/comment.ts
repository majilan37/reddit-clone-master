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
import { Comment, CreateCommentInput } from "../schema/comment";
import CommentService from "../services/comment";
import { Context } from "../types";

@Resolver(() => Comment)
export default class CommentResolver {
  constructor(private readonly commmentService: CommentService) {
    this.commmentService = new CommentService();
  }

  @Authorized()
  @Mutation(() => Comment)
  async createComment(
    @Arg("input") input: CreateCommentInput,
    @Ctx() context: Context
  ) {
    return this.commmentService.createComment(input, context);
  }

  @FieldResolver()
  async user(@Root() comment: Comment) {
    return this.commmentService.user(comment);
  }
}
