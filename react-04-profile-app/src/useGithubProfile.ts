import { useEffect, useState } from "react";
import { getGitHubUser, getGitHubUserRepositories } from "./api";

interface UserData {
  name: string;
  username: string;
  bio: string;
  followers: number;
  following: number;
}

export function useGitHubProfile(initialUsername: string) {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    username: initialUsername,
    bio: "",
    followers: 0,
    following: 0,
  });
  const [repositories, setRepositories] = useState<
    Array<{
      name: string;
      description: string;
      stars: number;
      language?: string;
    }>
  >([]);

  useEffect(() => {
    async function fetchGitHubData() {
      const userDataFromGitHub = await getGitHubUser(userData.username);

      setUserData({
        name: userDataFromGitHub.name || userData.username,
        username: userDataFromGitHub.login,
        bio: userDataFromGitHub.bio || "",
        followers: userDataFromGitHub.followers,
        following: userDataFromGitHub.following,
      });

      const reposResponse = await getGitHubUserRepositories(userData.username);

      const repositories = reposResponse
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
        }))
        .slice(-3);

      setRepositories(repositories);
    }

    fetchGitHubData();
  }, [userData.username]);
  return { userData, repositories };
}
