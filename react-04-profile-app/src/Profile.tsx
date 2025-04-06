import Avatar from "./Avatar";

interface ProfileProps {
  username: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export default function Profile({
  username,
  bio,
  followers,
  following,
}: ProfileProps) {
  return (
    <>
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
    </>
  );
}
