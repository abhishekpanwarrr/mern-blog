import ReactQuill from "react-quill";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [, setFile] = useState();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };
  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);

    const response = await axios.post("http://localhost:8000/post", data, {
      withCredentials: true,
    });
    console.log("response: " + response.data);
  };
  useEffect(() => {
    titleRef?.current?.focus();
  }, []);
  return (
    <form onSubmit={handleCreatePost} className="space-y-4">
      <Input
        ref={titleRef}
        placeholder="Title of your post"
        value={title}
        minLength={20}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Description of your post"
        value={summary}
        minLength={130}
        onChange={(e) => setSummary(e.target.value)}
      />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Cover</Label>
        <Input
          id="picture"
          type="file"
          onChange={(e) => setFile(e.target.files)}
        />
      </div>
      <ReactQuill
        value={content}
        modules={modules}
        onChange={(newValue) => setContent(newValue)}
      />
      <button
        className="bg-[crimson] my-4 px-4 py-2 text-white rounded-md w-max-w"
        type="submit"
      >
        Post
      </button>
    </form>
  );
};

export default Create;
