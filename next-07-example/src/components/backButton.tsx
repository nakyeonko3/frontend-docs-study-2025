"use client";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} aria-label="Go back">
      뒤로 가기
    </button>
  );
};
