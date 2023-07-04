import queryString from "query-string";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAsync } from "../../store/postSlice";

import Post from "../../components/post/Post";


const PostPage = () => {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const entities = useSelector(state => state.post.entities);
  const isLoading = useSelector(state => state.post.loading);
  const error = useSelector(state => state.post.error);

  // OPTONS FOR SELECT
  let keysPosts = [];
  if (posts.length) {
    keysPosts = Object.keys(posts[1]);
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

  const setSortedArr = (posts) => {
    setPosts(posts);
    setSortedposts(onSortPosts(posts, posts[0]?.id));
  };

  useEffect(() => {
    dispatch(getPostsAsync());
    setSortedArr(entities);
  }, []);

  useEffect(() => {
    if (!keysPosts.includes(queryKey)) {
      navigate("/posts");
      setKey();
      setSortedposts([...entities]);
    }
  }, [queryKey, navigate, posts]);

  if (error) {
    return <h2>{error}</h2>;
  }

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <h3>{queryKey ? `Posts were sorted by ${queryKey}` : "No queryKey"}</h3>
      <select
        onChange={(e) => setSortedposts(onSortPosts(posts, e.target.value))}
      >
        {keysPosts.map((prop, idx) => (
          <option key={idx} value={prop}>
            {prop}
          </option>
        ))}
      </select>
      {sortedposts.map((post, idx) => (
        <Post key={idx} {...post} />
      ))}
    </>
  );
};

export default PostPage;
