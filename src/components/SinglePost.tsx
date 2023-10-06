import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../lib/data";

interface Post {
  content: string;
  cover?: string;
  summary: string;
  tags?: [string];
  title: string;
  _id?: string;
}
const SinglePost = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post>();

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      const response = await axios.get(
        `http://localhost:8000/post/${params?.id}`,
        {
          withCredentials: true,
        }
      );
      setPost(response.data);
      setLoading(false);
    };
    getPosts();
  }, [params.id]);

  return (
    <div>
      {loading && <h1>Loading.....</h1>}
      {post ? (
        <>
          <div className="flex flex-col gap-5 mb-5 shadow-sm p-3 drop-shadow-sm rounded-md shadow-slate-600">
            <div className="">
              <img
                className=" h-full w-full object-contain max-h-[400px]"
                src={
                  post.cover ||
                  "https://neilpatel.com/wp-content/uploads/2022/12/Refresh-How-to-Start-a-Blog-That-Makes-You-Money-1.png"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col gap-4 items-start">
              <div className="w-full flex justify-between items-center my-2 gap-6">
                <h2 className="m-0 text-3xl overflow-clip">{post?.title}</h2>
              </div>
              <div className="-mt-3 text-sm">
                {/* {format(new Date(item?.createdAt), "dd, MMMM yyyy, HH:mm a")} */}
              </div>
              <p className="capitalize text-xl">{post?.summary}</p>
              <div
                className="content overflow-clip"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="flex gap-2 mt-auto flex-wrap">
                {post?.tags?.map((tag: string, index: number) => (
                  <button
                    key={index}
                    type="button"
                    className={`text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${colors[index]}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        "Not found"
      )}
    </div>
  );
};

export default SinglePost;
