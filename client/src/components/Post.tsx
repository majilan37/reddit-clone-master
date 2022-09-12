import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";
import {
  PostQuery,
  PostsQuery,
  useDeleteVoteMutation,
  useSetUpVoteMutation,
  useVotesForPostQuery,
  Vote,
} from "../generated/graphql";
import TimeAgo from "react-timeago";
import Avatar from "./Avatar";
import { ChatAltIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostsDocument } from "../generated/graphql";
import { toast } from "react-hot-toast";
import { useStateProvider } from "../context/StateProvider";

type PostForHome = PostsQuery["posts"][0];
type PostForSubreddit = Omit<PostsQuery["posts"][0], "subredditList">;

function Post({
  post,
  topic,
  className,
}: {
  post: PostForHome | PostForSubreddit | PostQuery["post"];
  topic?: string;
  className?: string;
}) {
  const [hasVoted, setHasVoted] = useState<boolean | undefined>(undefined);

  // * Current user
  const [{ user }] = useStateProvider();

  // * Muation hooks
  const [setVote, {}] = useSetUpVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();

  // * Query hooks
  const { data, refetch } = useVotesForPostQuery({
    variables: {
      postId: post?._id ?? "",
    },
  });

  const addVote = (vote: boolean) => {
    if (!user) return toast.error("Sign to vote");
    if (hasVoted === true && vote === true)
      return toast.error("You already voted");
    if (hasVoted === false && vote === false)
      return toast.error("You already voted");

    // * if the user is already voted and they try to down vote
    if (hasVoted === true && vote === false) {
      const vote = data?.votesForPost?.find(
        (e) => e.user._id === user?._id
      )?._id;

      deleteVote({
        variables: {
          id: vote!,
        },
      });
    }

    // * if the user is already down voted and they try to up vote
    if (hasVoted === false && vote === true) {
      const vote = data?.votesForPost?.find(
        (e) => e.user._id === user?._id
      )?._id;

      deleteVote({
        variables: {
          id: vote!,
        },
      });
    }

    // * create vote
    setVote({
      variables: {
        postId: post?._id ?? "",
        upvote: vote,
      },
    });

    toast.success("Vote added");
    refetch();
  };

  useEffect(() => {
    const hasVoted = data?.votesForPost?.find(
      (e) => e.user._id === user?._id
    )?.upvote;

    if (hasVoted === undefined) return;
    setHasVoted(hasVoted);
  }, [data]);

  // * Display votes
  const displayVotes = (arr: any[]): number => {
    return arr?.reduce((acc, curr) => {
      return (acc += curr?.upvote ? 1 : -1);
    }, 0);
  };

  console.log(hasVoted);

  return (
    <div className={`max-w-2xl flex w-full bg-gray-50 border ${className} `}>
      <div className="flex flex-col items-center p-5 space-y-2">
        <ArrowUpIcon
          onClick={() => addVote(true)}
          className={`h-5 text-gray-600 hover:bg-slate-100 hover:text-orange-500 p-1 cursor-pointer rounded-sm ${
            hasVoted && "text-orange-500"
          } `}
        />
        <span className="text-xs">
          {displayVotes(data?.votesForPost ?? [])}
        </span>
        <ArrowDownIcon
          onClick={() => addVote(false)}
          className={`h-5 text-gray-600 hover:bg-slate-100 p-1 hover:text-blue-500 cursor-pointer rounded-sm ${
            hasVoted === false && "text-blue-500"
          } `}
        />
      </div>
      <Link className="w-full flex-grow" to={`/post/${post?._id}`}>
        <div className=" bg-white  p-3 space-y-2 ">
          <div className="flex items-center gap-2">
            <Avatar />
            <div className="">
              <p className="flex items-center gap-2">
                <Link
                  className="hover:text-blue-500 hover:underline"
                  to={`/subreddit/${
                    ((post as PostForHome)?.subredditList &&
                      (post as PostForHome)?.subredditList[0].topic) ??
                    topic
                  }`}>
                  <span className="font-semibold">
                    r/
                    {((post as PostForHome)?.subredditList &&
                      (post as PostForHome)?.subredditList[0].topic) ??
                      topic}
                  </span>
                </Link>
                <caption className="text-xs text-gray-500">
                  posted by u/{post?.user?.username}{" "}
                  <TimeAgo date={post?.createdAt} />
                </caption>
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <h2 className="text-2xl  font-semibold">{post?.title}</h2>
            <p className="text-gray-700 font-light text-sm">{post?.body}</p>
            {post?.image && (
              <img
                className="w-full object-cover"
                src={post?.image ?? ""}
                alt=""
              />
            )}
          </div>
          <button className="text-gray-500 flex items-center space-x-2 px-3 py-2 rounded-sm hover:bg-gray-200 ">
            <ChatAltIcon className="h-5" /> <span>comments</span>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Post;
