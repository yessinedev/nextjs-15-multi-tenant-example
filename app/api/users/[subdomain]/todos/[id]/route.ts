import { NextResponse } from 'next/server';
import { getUserData, saveUserData } from '@/lib/data';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ subdomain: string; id: string }> }
) {
  try {
    const { subdomain, id } = await params;
    const data = await getUserData();
    const userIndex = data.users.findIndex((u) => u.subdomain === subdomain);

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const todoIndex = data.users[userIndex].todos.findIndex(
      (t) => t.id === parseInt(id)
    );

    if (todoIndex === -1) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    data.users[userIndex].todos[todoIndex].completed = 
      !data.users[userIndex].todos[todoIndex].completed;
    
    await saveUserData(data);

    return NextResponse.json({ message: 'Todo updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ subdomain: string; id: string }> }
) {
  try {
    const { subdomain, id } = await params;
    const data = await getUserData();
    const userIndex = data.users.findIndex((u: any) => u.subdomain === subdomain);

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    data.users[userIndex].todos = data.users[userIndex].todos.filter(
      (t: any) => t.id !== parseInt(id)
    );
    await saveUserData(data);

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting todo' },
      { status: 500 }
    );
  }
} 