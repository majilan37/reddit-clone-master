import { Field, InputType, ObjectType } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user";
import { Post } from "./post";

@ObjectType()
export class Vote {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ ref: () => User })
  userId: Ref<User>;

  @Field(() => String)
  @prop({ ref: () => Post })
  postId: Ref<Post>;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  user: User;

  @Field(() => Boolean)
  @prop({ required: true })
  upvote: boolean;
}

export const VoteModel = getModelForClass(Vote);

@InputType()
export class VoteInput implements Pick<Vote, "postId" | "upvote"> {
  @Field(() => String)
  postId: string;

  @Field(() => Boolean)
  upvote: boolean;
}

@InputType()
export class GetVoteForPost implements Pick<Vote, "postId"> {
  @Field(() => String)
  postId: string;
}

@InputType()
export class DeleteVoteInput implements Pick<Vote, "_id"> {
  @Field(() => String)
  _id: string;
}
