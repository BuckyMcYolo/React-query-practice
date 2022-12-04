export default function Species({ id, title, body }) {
  return (
    <li>
      {id}
      <ul>
        <li>Language: {title}</li>
        <li>Average Lifespan: {body}</li>
      </ul>
    </li>
  );
}
