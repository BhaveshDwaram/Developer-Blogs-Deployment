import { useEffect, useState } from "react";
    import Header from "../../components/header/Header";
    import Posts from "../../components/posts/Posts";
    import {url} from "../../url";

    import "./Read.css";
    import axios from "axios";
    import { useLocation } from "react-router";

    export default function Home() {
      const [posts, setPosts] = useState([]);
      const { search } = useLocation();

      useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get(url+"/posts/" + search);
          setPosts(res.data);
        };
        fetchPosts();
      }, [search]); 
      return (
        <>
          <Header />
          <div className="home">
            <Posts posts={posts} />
          </div>
        </>
      );
    }