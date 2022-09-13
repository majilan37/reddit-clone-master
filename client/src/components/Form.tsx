import { PhotographIcon } from "@heroicons/react/outline";
import { memo } from "react";
import Avatar from "./Avatar";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  PostsDocument,
  PostsQuery,
  useCreatePostMutation,
} from "../generated/graphql";
import Button from "./Button";
import { useStateProvider } from "../context/StateProvider";
import { SubredditsDocument } from "../generated/graphql";
import { toast } from "react-hot-toast";

type FormValues = Pick<PostsQuery["posts"][0], "title" | "image" | "body"> & {
  topic: string;
};

function Form({ subreddit }: { subreddit?: boolean }) {
  // * Mutation hooks
  const [createPost, { loading }] = useCreatePostMutation({
    refetchQueries: [PostsDocument, SubredditsDocument],
  });

  // * Current user
  const [{ user }] = useStateProvider();
  console.log("user >>", user);

  const { register, handleSubmit, watch, reset } = useForm<FormValues>();

  // * Create post
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user) return toast.error("Sign in to create a post");
    await createPost({
      variables: {
        ...data,
        image: data.image || null,
        topic: data.topic,
      },
    });

    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sticky top-16 z-50 space-y-2 bg-white border p-2 ">
      <div className="flex items-center space-x-2">
        <Avatar />
        <input
          type="text"
          {...register("title")}
          className="bg-gray-100 flex-grow px-4 outline-none py-2"
          placeholder="Create a post"
        />
        <PhotographIcon className="icon text-gray-500" />
      </div>
      {!!watch("title") && (
        <div className="space-y-2">
          <div className="flex gap-3 justify-between ">
            <label htmlFor="">Body</label>
            <textarea
              className="w-full max-w-4xl  bg-gray-100 flex-grow px-4 outline-none py-2 "
              placeholder="Text (Optional) "
              {...register("body")}
              rows={5}></textarea>
          </div>
          {!subreddit && (
            <div className="flex gap-3 items-center justify-between">
              <label htmlFor="">Subreddit</label>
              <input
                {...register("topic")}
                className="w-full max-w-4xl bg-gray-100 flex-grow px-4 outline-none py-2 "
                placeholder=" Subreddit "
              />
            </div>
          )}
          <div className="flex gap-3 justify-between items-center ">
            <label htmlFor="">Image</label>
            <input
              {...register("image")}
              className="w-full max-w-4xl bg-gray-100 flex-grow px-4 outline-none py-2 "
              placeholder=" Image "
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-600 !mt-3 text-white disabled:bg-gray-300 disabled:cursor-not-allowed "
            loading={loading}
            disabled={!user}
            text="Create Post"
          />
        </div>
      )}
    </form>
  );
}

export default memo(Form);
