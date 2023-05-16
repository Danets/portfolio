import styles from "./Post.module.css";

const Post = (props) => {
  const { title, body } = props;

  return (
    <div className={styles.post}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};
export default Post;
