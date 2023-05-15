const Post = (props) => {
    const {title, body} = props;

  return (
    <>
    <h3>{title}</h3>
    <p>{body}</p>
    </>  
  )

}
export default Post;