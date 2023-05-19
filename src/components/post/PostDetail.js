import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const PostDetail = () => {
  let { id } = useParams();
  return (
    <>
      <div>PostDetail {id}</div>
      <Link to={"/posts"}>Get back to posts</Link>
    </>
  );
};
