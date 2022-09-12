import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { Post } from "./post";

@ObjectType()
export class Subreddit {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  topic: string;

  @Field(() => [Post], {})
  posts: Post[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

export const SubredditModel = getModelForClass(Subreddit, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class CreateSubredditInput implements Pick<Subreddit, "topic"> {
  @Field(() => String)
  topic: string;
}

@InputType()
export class GetSubredditByTopic implements Pick<Subreddit, "topic"> {
  @Field(() => String)
  topic: string;
}
