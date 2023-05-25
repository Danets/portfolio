import queryString from "query-string";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Post from "../../components/post/Post";

const API = "https://jsonplaceholder.typicode.com/posts";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  let keysPosts = [];

  if (posts.length) {
    keysPosts = Object.keys(posts[0]);
  }

  const location = useLocation();
  const query = queryString.parse(location.search);

  const navigate = useNavigate();

  const onSortPosts = (arr, key) => {
    const sortedArr = [...arr];
    if (!key || !keysPosts.includes(key)) {
      return sortedArr;
    }
    sortedArr.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    return sortedArr;
  };

  const [queryKey, setKey] = useState(query.sort);
  const [sortedposts, setSortedposts] = useState(onSortPosts(posts, queryKey));

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API);
        const posts = await response.json();
        setPosts(posts);
        setSortedposts(onSortPosts(posts, posts[0].id))
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!keysPosts.includes(queryKey)) {
      navigate("/posts");
      setKey();
      setSortedposts([...posts]);
    }
  }, [queryKey, navigate]);

  if (error) {
    return <h2>{error}</h2>;
  }

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <h3>{queryKey ? `Posts were sorted by ${queryKey}` : 'No queryKey'}</h3>
      <select
        onChange={(e) => setSortedposts(onSortPosts(posts, e.target.value))}
      >
        {keysPosts.map((prop, idx) => (
          <option key={idx} value={prop}>
            {prop}
          </option>
        ))}
      </select>
      {sortedposts.map((post) => <Post key={post.id} {...post} />)}
    </>
  );
};

export default PostsPage;
