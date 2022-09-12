import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { Post } from "./post";
import { User } from "./user";

@ObjectType()
export class Comment {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  text: string;

  @Field(() => String)
  @prop({ required: true, ref: () => Post })
  postId: Ref<Post>;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  @prop({ ref: () => User })
  user: Ref<User>;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const CommentModel = getModelForClass(Comment, {
  schemaOptions: {
    timestamps: true,
  },
});

@InputType()
export class CreateCommentInput implements Pick<Comment, "postId" | "text"> {
  @Field(() => String)
  postId: string;

  @Field(() => String)
  text: string;
}
