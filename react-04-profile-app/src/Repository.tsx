interface RepositoryProps {
  name: string;
  description: string;
  stars: number;
  language?: string;
}

export default function Repository({
  name,
  description,
  stars,
  language,
}: RepositoryProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0" }}>{name}</h3>
      {description && <p>{description}</p>}
      <div style={{ display: "flex", gap: "16px", fontSize: "14px" }}>
        {language && <span>{language}</span>}
        <span>⭐ {stars}</span>
      </div>
    </div>
  );
}
