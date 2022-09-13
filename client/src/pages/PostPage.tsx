import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { useCreateCommentMutation, usePostQuery } from "../generated/graphql";
import { useStateProvider } from "../context/StateProvider";
import { Ring } from "@uiball/loaders";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import Avatar from "../components/Avatar";
import ReactTimeago from "react-timeago";
import Button from "../components/Button";

function PostPage() {
  const { id } = useParams();
  const [{ user }] = useStateProvider();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const { data, loading, refetch, error } = usePostQuery({
    variables: {
      id: id!,
    },
  });

  console.log("post error >>", error);

  const [createComment, { loading: createCommentLoading }] =
    useCreateCommentMutation();

  // * Add Comment
  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!commentRef.current?.value) return;
    await createComment({
      variables: {
        postId: id!,
        text: commentRef.current.value,
      },
    });

    commentRef.current.value = "";
    refetch();
    toast.success("Successfully toasted!");
  };
  console.log(data?.post);
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto py-12">
        {loading ? (
          <div className="flex w-full justify-center items-center p-10 text-xl">
            <Ring size={40} lineWeight={5} speed={2} color="#ff4501" />
          </div>
        ) : (
          <>
            {data?.post && (
              <Post post={data?.post} className="!w-full !max-w-4xl mx-auto" />
            )}
          </>
        )}
        <div className="!max-w-4xl mx-auto mt-2">
          <form onSubmit={addComment} className="flex flex-col space-y-2">
            <textarea
              ref={commentRef}
              className="w-full flex-1 border p-5 outline-none"
              placeholder={
                user ? `Comment as ${user.username}` : "Sign in to comment"
              }
              rows={10}></textarea>
            <Button
              className="bg-orange-500 self-end disabled:bg-gray-300 disabled:cursor-not-allowed "
              type="submit"
              disabled={!user}
              loading={createCommentLoading}>
              {createCommentLoading ? "Loading..." : "Add comment"}
            </Button>
          </form>
          <div className="mt-2 bg-white border shadow-sm pb-4 overflow-hidden">
            {data?.post?.comments.map((comment) => (
              <div
                className="relative flex items-center space-x-2 space-y-5 "
                key={comment._id}>
                <hr className="absolute top-10 h-16 border left-7 z-0   " />
                <div className="z-50 ">
                  <Avatar seed={comment.user.username} />
                </div>

                <div className="flex flex-col ">
                  <p className="py-2 text-xs text-gray-400  ">
                    <span className="font-semibold text-gray-600  ">
                      {comment.user.username}
                    </span>{" "}
                    <ReactTimeago date={comment.createdAt} />
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
