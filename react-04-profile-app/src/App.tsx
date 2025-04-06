import Profile from "./Profile";

// Mock
const userData = {
  name: "Nak-yeon Ko",
  username: "nakyeonko3",
  bio: "FrontEnd Web Developer ",
  followers: 12,
  following: 65,
};

// Mock
const repositories = [
  {
    id: 1,
    name: "react-project",
    description: "리액트 예제",
    language: "TypeScript",
    stars: 0,
  },
  {
    id: 2,
    name: "blog",
    description: "내 개인 블로그, Next.js로 작성",
    language: "TypeScript",
    stars: 0,
  },
];

function App() {
  return (
    <Profile
      username={userData.username}
      bio={userData.bio}
      followers={userData.followers}
      following={userData.following}
      repositories={repositories}
    />
  );
}

export default App;
