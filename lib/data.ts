import { promises as fs } from 'fs';
import path from 'path';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface User {
  name: string;
  subdomain: string;
  todos: Todo[];
}

export interface UsersData {
  users: User[];
}

export async function getUserData(): Promise<UsersData> {
  const filePath = path.join(process.cwd(), 'data/users.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function saveUserData(data: UsersData): Promise<void> {
  const filePath = path.join(process.cwd(), 'data/users.json');
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function getUserBySubdomain(subdomain: string): Promise<User | null> {
  const data = await getUserData();
  return data.users.find(u => u.subdomain === subdomain) || null;
} 