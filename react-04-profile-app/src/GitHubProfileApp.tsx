import Profile from "./Profile";
import Repository from "./Repository";
import { useGitHubProfile } from "./useGithubProfile";

export default function GitHubProfileApp() {
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
        <Profile {...userData} />
      </div>
      <h2>Repositories</h2>
      {repositories.map((repo) => (
        <Repository key={repo.name} {...repo} />
      ))}
    </div>
  );
}
