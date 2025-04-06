interface AvatarProps {
  username: string;
}

export default function Avatar({ username }: AvatarProps) {
  return (
    <img
      className="avatar"
      src={`https://github.com/${username}.png`}
      alt={`${username}'s profile picture`}
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        border: "2px solid #ccc",
      }}
    />
  );
}
