import { Ring } from "@uiball/loaders";
import { useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import Form from "../components/Form";
import Post from "../components/Post";
import { useSubredditQuery } from "../generated/graphql";

function Subreddit() {
  const { topic } = useParams();
  const { data, loading } = useSubredditQuery({
    variables: {
      topic: topic!,
    },
  });

  return (
    <div className="bg-slate-100">
      <div className="w-full h-32 bg-orange-400  mb-[-50px] "></div>
      <div className="bg-white w-full py-6 border-b">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Avatar large seed={topic} />
          <h2 className="text-3xl font-semibold ">
            Welcom the r/{topic} Subreddit{" "}
          </h2>
        </div>
      </div>
      <main className="max-w-5xl min-h-[90vh] space-y-2 py-2 mx-auto">
        <Form subreddit />
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full justify-center items-center p-10 text-xl">
                <Ring size={40} lineWeight={5} speed={2} color="#ff4501" />
              </div>
            ))}
          </>
        ) : (
          <>
            {data?.subreddit?.posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                topic={data?.subreddit?.topic!}
                className="!max-w-5xl"
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
}

export default Subreddit;
