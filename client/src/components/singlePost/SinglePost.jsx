import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import "./singlePost.css";
import {url} from "../../url";

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  //const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        //const res = await axios.get("/posts/" + path);
        const res = await axios.get(url+"/posts/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      //await axios.delete(`/posts/${post._id}`, {
      await axios.delete(url+`/posts/${post._id}`, {
        data: { username: user.username },
      });
      history.push("/read");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      // await axios.put(`/posts/${post._id}`, {
      await axios.put(url+`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePostTop">
        {post.photo && (
          <img src={post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">{title}</h1>
          )}
          <div className="singlePostEdit">
            {post.username === user?.username && (
              <>
                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </>
            )}
          </div>
          <hr className="singlePostHr" />
        </div>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <Link to={`/?user=${post.username}`} className="link"><b>{post.username}</b></Link>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>Update</button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
