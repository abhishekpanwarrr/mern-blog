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
  _id: string;
}
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://localhost:8000/posts", {
        withCredentials: true,
      });
      console.log("response.data", response.data);
        setPosts(response.data);
    };
    getPosts();
  }, []);
  return (
    <>
      {posts && posts.length > 0 ? 
        posts.map((item: Item) => {
          return <Post key={item._id} item={item} />;
        })
       : (
        <p>Post not found</p>
      )}
    </>
  );
};

export default Home;
