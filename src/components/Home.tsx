import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";

export interface Item {
  content: string;
  createdAt: string;
  summary: string;
  title: string;
  updatedAt: string;
  __v: number;
  id: string;
  tags: Array<string>;
  cover?: string;
}
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/post/all", {
        withCredentials: true,
      });
      setPosts(response.data);
      setLoading(false);
    };
    getPosts();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-6">
          <div className="flex gap-7 flex-row">
            <Skeleton className="w-full h-[300px] rounded-xl" />
            <div className="w-full flex flex-col gap-8">
              <Skeleton className="w-full h-[30px] rounded-xl" />
              <Skeleton className="w-full h-[30px] rounded-xl" />
              <Skeleton className="w-full h-[30px] rounded-xl" />
              <Skeleton className="w-full h-[30px] rounded-xl" />
              <Skeleton className="w-full h-[30px] rounded-xl" />
            </div>
          </div>
          <div className="flex gap-7 flex-row">
            <Skeleton className="w-full h-[300px] rounded-xl" />
            <div className="w-full flex flex-col gap-8">
              <Skeleton className="w-full h-[30px] rounded-xl" />
              <Skeleton className="w-full h-[30px] rounded-xl" />
              <Skeleton className="w-full h-[30px] rounded-xl" />
              <Skeleton className="w-full h-[30px] rounded-xl" />
              <Skeleton className="w-full h-[30px] rounded-xl" />
            </div>
          </div>
        </div>
      ) : posts && posts.length > 0 ? (
        posts.map((item: Item) => {
          return <Post key={item.id} item={item} />;
        })
      ) : (
        <p>Post not found</p>
      )}
    </>
  );
};

export default Home;
