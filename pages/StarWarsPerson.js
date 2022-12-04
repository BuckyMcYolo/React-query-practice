export default function Person({ name, hairColor, eyeColor }) {
  return (
    <li>
      {name}
      <ul>
        <li>Hair Color: {hairColor}</li>
        <li>Eye Color: {eyeColor}</li>
      </ul>
    </li>
  );
}
