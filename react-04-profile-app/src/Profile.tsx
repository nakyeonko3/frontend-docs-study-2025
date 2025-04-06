import Avatar from "./Avatar";
import Repository from "./Repository";

interface ProfileProps {
  username: string;
  bio: string;
  followers: number;
  following: number;
  repositories: Array<{
    name: string;
    description: string;
    stars: number;
    language?: string;
  }>;
}

export default function Profile({
  username,
  bio,
  followers,
  following,
  repositories,
}: ProfileProps) {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Avatar username={username} />
        <div>
          <h1>{username}</h1>
          <h2 style={{ color: "#666" }}>@{username}</h2>
          {bio && <p>{bio}</p>}

          <div style={{ display: "flex", gap: "15px" }}>
            <span>👥 {followers} followers</span>
            <span>👤 {following} following</span>
          </div>
        </div>
      </div>

      <h2>Pinned Repositories</h2>
      {repositories.map((repo) => (
        <Repository key={repo.name} {...repo} />
      ))}
    </div>
  );
}
