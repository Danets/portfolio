import { Link } from "react-router-dom";
import styles from "./Post.module.css";

const Post = (props) => {
  const { title, body, id } = props;

  return (
    <div className={styles.post}>
      <Link to={`/posts/${id}`}>
        <h3>{title}</h3>
        <p>{body}</p>
      </Link>
    </div>
  );
};
export default Post;
