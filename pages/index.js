import Link from "next/link";
import { useQuery } from "react-query";
import Microphone from "./microphone";
import Timer from "./timer";

export default function Home() {
  //first argument is a name that essentially acts as your queries variable, second is a function that reurns a promise (that function will be your data fetching function)

  const fetchCharacters = async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = res.json();
    return data;
  };

  const query = useQuery("characters", fetchCharacters);

  //Can also be written as:
  // const {data, isLoading, isError} = useQuery("characters", fetchCharacters)

  // console.log(query);
  // Everything that useQuery returns:
  /* 
data: undefined
dataUpdatedAt: 0
error: null
errorUpdateCount: 1
errorUpdatedAt: 1668044933294
failureCount: 3 
isError: false
isFetched: true
isFetchedAfterMount: true
isFetching: true
isIdle: false
isLoading: true
isLoadingError: false
isPlaceholderData: false
isPreviousData: false
isRefetchError: false
isRefetching: false
isStale : true
isSuccess: false
refetch: ƒ ()
remove: ƒ ()
status: "loading"
[[Prototype]]: Object
*/

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error... unable to fetch data</div>;
  }

  return (
    <div>
      <h1>
        {/* {query.data.results.map((character) => {
          return (
            <div
              style={{ display: "grid", gridTemplateColumns: 2 }}
              key={character.id}
            >
              <div>{character.name}</div>
              <div>
                {character.image ? (
                  <img src={character.image} alt={character.name} />
                ) : null}
              </div>
            </div>
          );
        })} */}
        <Timer></Timer>
        <Microphone />
      </h1>
      <Link href="/openAi">OpenAI</Link>
    </div>
  );
}
