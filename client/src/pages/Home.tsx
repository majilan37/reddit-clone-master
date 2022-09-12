import Post from "../components/Post";
import { usePostsQuery, useSubredditsQuery } from "../generated/graphql";
import { Ring } from "@uiball/loaders";
import Form from "../components/Form";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";

function Home() {
  const { data, loading } = usePostsQuery();
  const { data: subredditsQuery } = useSubredditsQuery();

  return (
    <div className="bg-slate-100">
      <main className="max-w-5xl   py-2 mx-auto">
        <Form />
        <div className="flex mt-2 gap-2 items-start">
          <div className="space-y-2 ">
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
                {data?.posts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </>
            )}
          </div>
          <div className="bg-white flex-1 border sticky top-32 divide-y-2 shadow-sm px-4 py-2">
            <h2 className="text-lg font-bold my-3">Top Communities</h2>
            {subredditsQuery?.subreddits.map((subreddit) => (
              <div
                key={subreddit._id}
                className="px-4 space-x-2 flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Avatar seed={subreddit.topic} />
                  <p>
                    r/<b>{subreddit.topic}</b>{" "}
                  </p>
                </div>
                <Link
                  className=" bg-blue-500 rounded-lg border text-sm text-white px-3 py-1"
                  to={`/subreddit/${subreddit.topic}`}>
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
