import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { url } from "../../url";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Image is required to create a post");
      return;
    }

    try {
      // Upload image to S3
      const data = new FormData();
      data.append("file", file);
      const uploadRes = await axios.post(url + "/upload/", data);

      const newPost = {
        username: user.username,
        title,
        desc,
        photo: uploadRes.data.url, // Use S3 image URL
      };

      // Create Post
      const res = await axios.post(url + "/posts/", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("Error creating post: ", err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="write">
      <h2 className="writeHeading">Write your blogs here</h2>
      {file && <img className="writeImg" src={URL.createObjectURL(file)} alt="" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}