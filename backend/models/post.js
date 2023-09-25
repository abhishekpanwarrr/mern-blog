import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover:String,
    tags:Array
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;