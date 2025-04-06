import axios from "axios";

interface UserData {
  name: string;
  username: string;
  bio: string;
  followers: number;
  following: number;
  login: string;
}

interface RepositoryData {
  name: string;
  description: string;
  stargazers_count: number;
  language?: string;
}

export async function getGitHubUser(username: string): Promise<UserData> {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getGitHubUserRepositories(
  username: string
): Promise<RepositoryData[]> {
  try {
    const { data } = await axios.get<RepositoryData[]>(
      `https://api.github.com/users/${username}/repos`
    );
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
