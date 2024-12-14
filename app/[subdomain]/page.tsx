'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import type { Todo, User } from '@/lib/data';
import { toast, Toaster } from 'react-hot-toast';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  ListTodo, 
  User as UserIcon,
  Loader2
} from 'lucide-react';

interface Props {
  params: Promise<{ subdomain: string }>;
}

export default function SubdomainPage({ params }: Props) {
  const { subdomain } = use(params);
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchUserAndTodos();
  }, [subdomain]);

  const fetchUserAndTodos = async () => {
    try {
      const response = await fetch(`/api/users/${subdomain}`);
      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        setTodos(data.user.todos);
      } else {
        notFound();
      }
    } catch (error) {
      toast.error('Failed to load todos');
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const addPromise = new Promise(async (resolve, reject) => {
      setIsAdding(true);
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };

      try {
        const response = await fetch(`/api/users/${subdomain}/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo),
        });

        const data = await response.json();

        if (response.ok) {
          setTodos([...todos, todo]);
          setNewTodo('');
          resolve(data.message);
        } else {
          reject(data.error);
        }
      } catch (error) {
        reject('Failed to add todo');
      } finally {
        setIsAdding(false);
      }
    });

    toast.promise(addPromise, {
      loading: 'Adding task...',
      success: 'Task added successfully!',
      error: (err: string) => `${err}`
    });
  };

  const toggleTodo = async (id: number) => {
    const togglePromise = new Promise(async (resolve, reject) => {
      try {
        const updatedTodos = todos.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );

        const response = await fetch(`/api/users/${subdomain}/todos/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: !todos.find(t => t.id === id)?.completed }),
        });

        const data = await response.json();

        if (response.ok) {
          setTodos(updatedTodos);
          resolve(data.message);
        } else {
          reject(data.error);
        }
      } catch (error) {
        reject('Failed to update task');
      }
    });

    toast.promise(togglePromise, {
      loading: 'Updating task...',
      success: 'Task updated successfully!',
      error: (err: string) => `${err}`
    });
  };

  const deleteTodo = async (id: number) => {
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/users/${subdomain}/todos/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
          setTodos(todos.filter(todo => todo.id !== id));
          resolve(data.message);
        } else {
          reject(data.error);
        }
      } catch (error) {
        reject('Failed to delete task');
      }
    });

    toast.promise(deletePromise, {
      loading: 'Deleting task...',
      success: 'Task deleted successfully!',
      error: (err: string) => `${err}`
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return notFound();
  }

  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
          },
          success: {
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  {user.name}'s Tenant
                </h1>
                <p className="text-blue-100">
                  {subdomain}.localhost:3000
                </p>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm text-white">
                <ListTodo className="w-4 h-4" />
                <span>{completedTodos} of {todos.length} completed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6">
            <form onSubmit={addTodo} className="mb-8">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isAdding}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Task
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between p-4 rounded-xl group hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      {todo.completed ? (
                        <div className="p-1 rounded-full bg-blue-50">
                          <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        </div>
                      ) : (
                        <div className="p-1 rounded-full hover:bg-blue-50">
                          <Circle className="w-5 h-5" />
                        </div>
                      )}
                    </button>
                    <span className={`${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {todos.length === 0 && (
                <div className="text-center py-12">
                  <ListTodo className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No tasks yet. Add one above!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}