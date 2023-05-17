import { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import styles from "./Posts.module.css";

const API = "https://sonplaceholder.typicode.com/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API);
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    })();
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    posts.map((post) => <Post key={post.id} {...post} />)
  );
};

export default Posts;
