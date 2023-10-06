import ReactQuill from "react-quill";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Select, SelectOption } from "./Select";
import toast from "react-hot-toast";
const options = [
  { label: "Coding", value: 1 },
  { label: "React Js", value: 2 },
  { label: "Next js", value: 3 },
  { label: "Backend", value: 4 },
  { label: "Node js", value: 5 },
  { label: "Python", value: 6 },
  { label: "Fast api", value: 7 },
  { label: "HTML", value: 8 },
  { label: "Css", value: 9 },
];
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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
    try {
      let result;
      if (file) {
        setLoading(true);
        const image = new FormData();
        image.append("file", file);
        image.append("upload_preset", "blog_app");
        image.append("cloud_name", "dircbwq69");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dircbwq69/image/upload",
          {
            method: "POST",
            body: image,
          }
        );
        result = await res.json();
      }

      if (title === "" || summary === "" || content === "") {
        return toast("Enter the fields!");
      }

      const postData = {
        title: title,
        summary: summary,
        content: content,
        cover: result?.url || "",
        tags: value1.map((item) => item.label),
      };

      const response = await axios.post(
        "http://localhost:8000/post/create",
        postData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setLoading(false);
        navigate("/");
        return toast.success("Post created successfully");
      } else {
        return toast.error("Something went wrong");
      }
    } catch (error) {
      return toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    titleRef?.current?.focus();
  }, []);
  return (
    <form onSubmit={handleCreatePost} className="space-y-4">
      <>
        <Select
          multiple
          options={options}
          value={value1}
          onChange={(o) => setValue1(o)}
        />
      </>
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
        minLength={50}
        onChange={(e) => setSummary(e.target.value)}
      />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Cover</Label>
        <Input
          id="picture"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
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
        {loading ? "Creating...." : "Post"}
      </button>
    </form>
  );
};

export default Create;
