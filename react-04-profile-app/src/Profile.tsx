import Avatar from "./Avatar";
import Repository from "./Repository";
import { useGitHubProfile } from "./useGithubProfile";

export default function Profile() {
  const { userData, repositories } = useGitHubProfile("nakyeonko3");

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
        <Avatar username={userData.username} />
        <div>
          <h1>{userData.username}</h1>
          <h2 style={{ color: "#666" }}>@{userData.username}</h2>
          {userData.bio && <p>{userData.bio}</p>}

          <div style={{ display: "flex", gap: "15px" }}>
            <span>👥 {userData.followers} followers</span>
            <span>👤 {userData.following} following</span>
          </div>
        </div>
      </div>
      <h2>Repositories</h2>
      {repositories.map((repo) => (
        <Repository key={repo.name} {...repo} />
      ))}
    </div>
  );
}
