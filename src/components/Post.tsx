import { ArrowUpRightSquare } from "lucide-react";
import { Item } from "./Home";
// import format from "date-fns/format";
import { Link } from "react-router-dom";
import { colors } from "../lib/data";

const Post = ({ item }: { item: Item }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 grid-col gap-5 mb-5 shadow-sm p-3 drop-shadow-sm rounded-md shadow-slate-600">
      <div className="col-span-3">
        <img
          className=" h-full w-full object-contain max-h-[400px]"
          src={item.cover || "https://neilpatel.com/wp-content/uploads/2022/12/Refresh-How-to-Start-a-Blog-That-Makes-You-Money-1.png"}
          alt=""
        />
      </div>
      <div className="col-span-2 flex flex-col gap-4 items-start">
        <div className="w-full flex justify-between items-center my-2 gap-6">
          <h2 className="m-0 text-2xl overflow-clip">{item.title}</h2>
          <Link to="/" target="_blank" title="Share">
            <ArrowUpRightSquare className="text-gray-500 cursor-pointer w-6 h-6" />
          </Link>
        </div>
        <div className="-mt-3 text-sm">
          {/* {format(new Date(item?.createdAt), "dd, MMMM yyyy, HH:mm a")} */}
        </div>
        <p className="max-h-[310px] overflow-clip capitalize">{item.summary}</p>
        {/* <div
          className="content max-h-[100px] overflow-clip"
          dangerouslySetInnerHTML={{ __html: item.content }}
        /> */}
        <div className="flex gap-2 mt-auto flex-wrap">
          {item?.tags?.map((tag: string, index: number) => (
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
  );
};

export default Post;
