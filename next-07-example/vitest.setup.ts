import { afterEach, vi } from "vitest";

import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

vi.mock("next/cache");
vi.mock("next/navigation");
