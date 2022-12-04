import { useQuery, useQueryClient } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Posts from "./posts";
import styles from "../styles/posts.module.css";

const NewPage = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("");

  const queryClient = useQueryClient();
  //This is for prefetching
  useEffect(() => {
    const nextPage = page + 1;
    queryClient.prefetchQuery(["posts", nextPage], () => fetchJSON(nextPage));
  }, [page, queryClient]);

  async function fetchJSON(pageNumber) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
    );
    return res.json();
  }

  //acts sorta like a useEffect here taking a second argument that will get rerun when the data changes
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["posts", page],
    () => fetchJSON(page),
    {
      //staleTime is basically how old u want the data to get before its refetched, default is 0ms
      staleTime: 2000,
      keepPreviousData: true,
      //how long to hold onto data in the background before it gets garbage collected
      cacheTime: 1000,
    }
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }
  function nextPage() {
    setPage((prevpage) => prevpage + 1);
    setSelected(null);
  }
  function prevPage() {
    setPage((prevpage) => prevpage - 1);
    setSelected(null);
  }
  return (
    <div className={styles.main}>
      <div>Posts</div>
      <ul>
        {data.map((item) => (
          <li onClick={() => setSelected(item)} key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>{" "}
      <div>
        <p>Page {page}</p>
        <button disabled={page === 1} onClick={prevPage}>
          Previous Page
        </button>
        <button disabled={page === 10} onClick={nextPage}>
          Next Page
        </button>
      </div>
      <div>{selected && <Posts post={selected} />}</div>
    </div>
  );
};

export default NewPage;
