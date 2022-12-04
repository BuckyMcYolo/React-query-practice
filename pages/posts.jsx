import { useQuery, useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../styles/posts.module.css";

const Posts = ({ post }) => {
  async function fetchComments(postId) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return res.json();
  }

  async function deletePost(postId) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
      { method: "DELETE" }
    );
    return res.json();
  }

  async function updateTitle(postId) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
      { method: "POST", data: { title: "Yeehaw" } }
    );
    return res.json();
  }
  //pass a dependency array as the query key and the second parameter basically becomes indexed caches of all the loaded data
  //when the cache for that specific component is empty the page will do a full remount and refetch but, when the cache already knows the data, it will render it seamlessly
  //Note. in order to pass parameters to use query you need to pass an anonymous function that returns the useQuery function
  const { data, error, isLoading } = useQuery(["comments", post.id], () =>
    fetchComments(post.id)
  );
  // useMutation does not take a query key and can take an argument itself w/o the need for an anonymous function
  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation(() => updateTitle(post.id));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error.toString() || "Error"}</div>;
  }

  return (
    <div className={styles.main2}>
      <h2>Title: {post.title}</h2>
      <div className={styles.btnGroup}>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>{" "}
        {deleteMutation.isError && (
          <p style={{ color: "red" }}>Error deleting the post</p>
        )}
        {deleteMutation.isLoading && (
          <p style={{ color: "blue" }}>Deleting the post</p>
        )}
        {deleteMutation.isSuccess && (
          <p style={{ color: "green" }}>Post deleted</p>
        )}
        <button onClick={() => updateMutation.mutate()}>Update Title</button>
        {updateMutation.isError && (
          <p style={{ color: "red" }}>Error updating the post</p>
        )}
        {updateMutation.isLoading && (
          <p style={{ color: "blue" }}>Updating the post</p>
        )}
        {updateMutation.isSuccess && (
          <p style={{ color: "green" }}>Post updated</p>
        )}
      </div>
      <p>Body: {post.body}</p>
      <p>Comments</p>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </div>
  );
};

export default Posts;
