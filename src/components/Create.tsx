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
  const [, setFile] = useState();
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
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
    console.log("tags",value1.map(item => item.label));
    
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("tags",JSON.stringify(value1.map(item => item.label)))
    if (title === "" || summary === "" || content === "") {
      return toast("Enter the fields!");
    }
    console.log("data",data);
    
    const response = await axios.post("http://localhost:8000/post", data, {
      withCredentials: true,
    });
    if (response.status === 201) {
      navigate("/")
      return toast.success("Post created successfully");
    } else {
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
