import { Link } from "react-router-dom";
import styles from "./Post.module.css";
import Card from "../ui/Card";

const Post = (props) => {
  const { title, body, id } = props;

  return (
    <>
      <Card>
        <div className={styles.post}>
          <Link to={`/posts/${id}`}>
            <h3>{title}</h3>
            <p>{body}</p>
          </Link>
        </div>
      </Card>
    </>
  );
};
export default Post;
