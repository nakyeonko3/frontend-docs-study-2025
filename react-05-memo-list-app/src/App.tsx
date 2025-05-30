import Profile from "./Profile";
import Timer from "./Timer";

const people = [
  "Creola Katherine Johnson: mathematician",
  "Mario José Molina-Pasquel Henríquez: chemist",
  "Mohammad Abdus Salam: physicist",
  "Percy Lavon Julian: chemist",
  "Subrahmanyan Chandrasekhar: astrophysicist",
];

function List() {
  const listItems = people.map((person, index) => (
    <li key={index}>{person}</li>
  ));
  return <ul>{listItems}</ul>;
}

function Item({ name, isPacked }: { name: string; isPacked: boolean }) {
  return (
    <li className="item">
      {name} {isPacked && "✅"}
    </li>
  );
}

function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}

function App() {
  return (
    <>
      <PackingList />
      <Timer />
      <List />
      <Profile
        person={{
          name: "koko",
          avatarUrl: "https://i.imgur.com/lrWQx8ls.jpg",
        }}
      />
      <Profile
        person={{
          name: "KiKi",
          avatarUrl: "https://i.imgur.com/MK3eW3As.jpg",
        }}
      />
    </>
  );
}

export default App;
