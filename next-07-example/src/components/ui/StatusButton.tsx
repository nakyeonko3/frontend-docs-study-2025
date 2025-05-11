interface StatusButtonProps {
  status: "open" | "closed";
  onClick?: () => void;
}

export default function StatusButton({ status, onClick }: StatusButtonProps) {
  return (
    <button
      className="status"
      aria-pressed={status === "open"}
      type="button"
      onClick={onClick}
    >
      {status === "open" ? "Open" : "Closed"}
    </button>
  );
}
