import { NextResponse } from 'next/server';
import { getUserData, saveUserData } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { subdomain: string } }
) {
  try {
    const data = await getUserData();
    const user = data.users.find((u) => u.subdomain === params.subdomain);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ todos: user.todos });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching todos' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ subdomain: string }> }
) {
  try {
    const { subdomain } = await params;
    const todo = await request.json();
    const data = await getUserData();
    const userIndex = data.users.findIndex((u) => u.subdomain === subdomain);

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    data.users[userIndex].todos.push(todo);
    await saveUserData(data);

    return NextResponse.json({ message: 'Todo added successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error adding todo' },
      { status: 500 }
    );
  }
} 