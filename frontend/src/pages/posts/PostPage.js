import { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import queryString from "query-string";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useGetPostsQuery, useAddPostMutation } from "../../store/postApiSlice";
import Post from "../../components/Post/Post";
import Search from "../../components/Layout/Search";

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();

  // OPTONS FOR SELECT
  let keysPosts = [];
  if (posts.length) {
    keysPosts = Object.keys(posts[0]).filter(
      (key) => key === "title" || key === "createdAt" || key === "updatedAt"
    );
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
  const [valueSelect, setValueSelect] = useState("");
  const [sortedposts, setSortedposts] = useState(onSortPosts(posts, queryKey));

  const [search, setSearch] = useState("");

  const handleSearch = (searchText) => {
    setSearch(searchText);
  };

  const setSortedArr = (posts) => {
    setPosts(posts);
    setSortedposts(onSortPosts(posts, "title"));
  };

  const onChangeHandler = (e) => {
    setValueSelect(e.target.value);
    setSortedposts(onSortPosts(posts, e.target.value));
  };

  // const onChangeHandlerMemo = useMemo(() => onChangeHandler, [posts]);

  // const onChangeHandlerWithCallback = useCallback(onChangeHandler, [posts]);

  const fetchPosts = () => {
    if (data) {
      const posts = Object.values(data?.entities).map((post) => {
        return {
          ...post,
          createdAt: new Date(post.createdAt).toLocaleString("uk-UA", {
            day: "numeric",
            month: "long",
          }),
          updatedAt: new Date(post.updatedAt).toLocaleString("uk-UA", {
            day: "numeric",
            month: "long",
          }),
        };
      });
      setSortedArr(posts);
      toast("Posts Loaded!");
    }
  };

  const [isEnableForm, setEnableForm] = useState(false);
  const enableAddingForm = () => setEnableForm(true);

  const initialValues = {
    title: "",
    body: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    body: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await addPost(values).unwrap();
      fetchPosts();
      toast("Post was added!");
      setEnableForm(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [data]);

  useEffect(() => {
    if (!keysPosts.includes(queryKey)) {
      navigate("/posts");
      setKey();
      setSortedposts([...posts]);
    }
  }, [queryKey, navigate, posts]);

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>{error?.message}</h2>}
      {isSuccess && (
        <>
          <h3>
            {queryKey ? `Posts were sorted by ${queryKey}` : "No queryKey"}
          </h3>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sort-select">Sorting</InputLabel>
            <Select
              labelId="sort-select"
              label="Sorting"
              value={valueSelect}
              onChange={onChangeHandler}
            >
              {keysPosts.map((prop, idx) => (
                <MenuItem key={idx} value={prop}>
                  {prop}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Search onSearch={handleSearch} />

          <Button variant="contained" onClick={enableAddingForm}>
            Add New Post
          </Button>

          {!isEnableForm &&
            sortedposts
              .filter((post) => {
                return search.toLowerCase() === ""
                  ? post
                  : post.title.toLowerCase().includes(search);
              })
              .map((post, idx) => <Post key={idx} {...post} />)}
          {isEnableForm && (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnMount
            >
              {({ isValid, isSubmitting }) => (
                <Form>
                  <label htmlFor="title">Title</label>
                  <Field name="title" type="text" id="title" />
                  <ErrorMessage name="title">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>

                  <label htmlFor="body">Body</label>
                  <Field name="body" type="text" id="body" />
                  <ErrorMessage name="body">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>

                  <button type="submit" disabled={!isValid || isSubmitting}>
                    Add Post
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </>
      )}
    </>
  );
};

export default PostPage;
