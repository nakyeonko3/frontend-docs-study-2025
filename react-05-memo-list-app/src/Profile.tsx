function getImageUrl(person: { avatarUrl?: string }) {
  return person.avatarUrl || "https://i.imgur.com/MK3eW3As.jpg";
}

interface Person {
  name: string;
  avatarUrl?: string;
}

function Header({ person }: { person: { name: string } }) {
  return <h2>{person.name}</h2>;
}

function Avatar({ person }: { person: Person }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}

export default function Profile({ person }: { person: Person }) {
  return (
    <div className="profile">
      <Header person={person} />
      <Avatar person={person} />
    </div>
  );
}
