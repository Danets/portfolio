import { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import queryString from "query-string";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getPostsAsync } from "../../store/postSlice";
import Post from "../../components/Post/Post";

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const { entities, isLoading, error } = useSelector((state) => state.post);

  // OPTONS FOR SELECT
  let keysPosts = [];
  if (posts.length) {
    keysPosts = Object.keys(posts[0]);
  }

  // LOCATION
  const location = useLocation();
  const query = queryString.parse(location.search);

  const navigate = useNavigate();

  // SORTING LOGIC
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
    if (posts) {
      setPosts(posts);
      setSortedposts(onSortPosts(posts, posts[0]?.userId));
    }
  };

  const onChangeHandler = (e) => {
    setSortedposts(onSortPosts(posts, e.target.value));
  };

  const onChangeHandlerMemo = useMemo(() => onChangeHandler, [posts]);

  const onChangeHandlerWithCallback = useCallback(onChangeHandler, [posts]);

  useEffect(() => {
    dispatch(getPostsAsync())
      .unwrap()
      .then((res) => {
        setSortedArr(res);
        toast("Posts Loaded!")}
        )
      .catch((err) => toast(err));
    setSortedArr(entities);
  }, [dispatch]);

  useEffect(() => {
    if (!keysPosts.includes(queryKey)) {
      navigate("/posts");
      setKey();
      setSortedposts([...posts]);
    }
  }, [queryKey, navigate, posts]);

  return (
    <>
      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <>
          <h3>
            {queryKey ? `Posts were sorted by ${queryKey}` : "No queryKey"}
          </h3>
          <select onChange={onChangeHandlerMemo}>
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
      )}
    </>
  );
};

export default PostPage;
