import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./PostDetail.module.css";

import {
  useGetPostByIdMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../store/postApiSlice";

export const PostDetail = () => {
  let { id } = useParams();

  const [getPostById] = useGetPostByIdMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const navigate = useNavigate();

  const [post, setPost] = useState();
  const [isEnableForm, setEnableForm] = useState(false);
  const enableEditingForm = () => setEnableForm(true);

  useEffect(() => {
    (async () => {
      try {
        const post = await getPostById(id).unwrap();
        setPost(post);
      } catch (error) {
        toast(error);
      }
    })();
  }, []);

  const onDeletePost = async () => {
    try {
      await deletePost(id).unwrap();
      toast("Post was deleted!");
      navigate("/posts");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const initialValues = {
    id,
    title: post?.title,
    body: post?.body,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    body: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updatePost(values).unwrap();
      toast("Post was updated!");
      setEnableForm(false);
      navigate("/posts");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <h2>{post?.title}</h2>
          <p>{post?.body}</p>
        </CardContent>
        <CardActions>
          <Link to={"/posts"}>Get back to posts</Link>
        </CardActions>
      </Card>
      <div className={styles.container__btn}>
        <Button variant="contained" onClick={enableEditingForm}>
          Edit Post
        </Button>
        <Button variant="contained" onClick={onDeletePost}>
          Delete Post
        </Button>
      </div>

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
                Edit Post
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
