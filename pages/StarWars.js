import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import Person from "./StarWarsPerson";

const initialURL = "https://swapi.dev/api/people/";
const fetchURL = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const StarWars = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "starwars-people",
    ({ pageParam = initialURL }) => fetchURL(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div>
      {isFetching && (
        <div
          style={{
            position: "fixed",
            top: 0,
            backgroundColor: "white",
            color: "black",
            right: 0,
          }}
        >
          Fetching more data...
        </div>
      )}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                name={person.name}
                eyeColor={person.eye_color}
                hairColor={person.hair_color}
                key={person.name}
              />
            );
          });
        })}
      </InfiniteScroll>
      Star Wars
    </div>
  );
};

export default StarWars;
