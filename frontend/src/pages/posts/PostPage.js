import { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

import {
  useAddPostMutation,
  useGetPostsMutation,
  useGetPostByIdMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../store/postApi";
import Post from "../../components/Post/Post";

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const [getPosts, { isLoading }] = useGetPostsMutation();
  const [addPost] = useAddPostMutation();

  // const { entities, isLoading, error } = useSelector((state) => state.post);

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
  const [sortedposts, setSortedposts] = useState(onSortPosts(posts, queryKey));

  const setSortedArr = (posts) => {
    if (posts) {
      setPosts(posts);
      setSortedposts(onSortPosts(posts, posts[0]?.title));
    }
  };

  const onChangeHandler = (e) => {
    setSortedposts(onSortPosts(posts, e.target.value));
  };

  const onChangeHandlerMemo = useMemo(() => onChangeHandler, [posts]);

  const onChangeHandlerWithCallback = useCallback(onChangeHandler, [posts]);

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
      const res = await addPost(values).unwrap();
      toast("Post was added!");
      setPosts([...posts, res]);
      setEnableForm(false);
      // navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getPosts().unwrap();
        const posts = res.map((post) => {
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
      } catch (error) {
        toast(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!keysPosts.includes(queryKey)) {
      navigate("/posts");
      setKey();
      setSortedposts([...posts]);
    }
  }, [queryKey, navigate, posts]);

  return (
    <>
      {/* {error && <h2>{error}</h2>} */}
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <>
          <h3>
            {queryKey ? `Posts were sorted by ${queryKey}` : "No queryKey"}
          </h3>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sort-select">Sorting</InputLabel>
            <Select
              labelId="sort-select"
              label="Sorting"
              value={"title"}
              onChange={onChangeHandlerMemo}
            >
              {keysPosts.map((prop, idx) => (
                <MenuItem key={idx} value={prop}>
                  {prop}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={enableAddingForm}>
            Add New Post
          </Button>
          {!isEnableForm && sortedposts.map((post, idx) => (
            <Post key={idx} {...post} />
          ))}
          {isEnableForm &&
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
          }
        </>
      )}
    </>
  );
};

export default PostPage;
