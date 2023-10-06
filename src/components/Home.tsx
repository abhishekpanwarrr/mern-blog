import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

export interface Item {
  content: string;
  createdAt: string;
  summary: string;
  title: string;
  updatedAt: string;
  __v: number;
  id: string;
  tags: Array<string>;
  cover?:string
}
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://localhost:8000/post/all", {
        withCredentials: true,
      });
      setPosts(response.data);
    };
    getPosts();
  }, []);
  return (
    <>
      {posts && posts.length > 0 ? (
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
