import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { Subreddit } from "./subreddit";
import { User } from "./user";
import { Comment } from "./comment";

@ObjectType()
export class Post {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  title: string;

  @Field(() => String)
  @prop({ required: true })
  body: string;

  @Field(() => String, { nullable: true })
  @prop({})
  image: string;

  @Field(() => String)
  @prop({ ref: () => Subreddit })
  subredditId: Ref<Subreddit>;

  @Field(() => [Subreddit])
  subredditList: [Subreddit];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => User, { nullable: true })
  @prop({ ref: () => User })
  user: Ref<User>;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const PostModel = getModelForClass(Post, {
  schemaOptions: { timestamps: true },
});

type CreatePostType = Pick<Post, "title" | "body" | "image"> & {
  topic: string;
};

@InputType()
export class CreatePostInput implements CreatePostType {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  topic: string;

  @Field(() => String, { nullable: true })
  image: string;
}

@InputType()
export class GetPostInput implements Pick<Post, "_id"> {
  @Field(() => String)
  _id: string;
}
