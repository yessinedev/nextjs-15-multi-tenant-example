import AddUserForm from '@/components/AddUserForm';
import users from '@/data/users.json';
import { Users, Globe, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg">
            <Users className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Create New Tenant</h2>
          </div>
          <AddUserForm />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full shadow-lg">
              <Globe className="w-5 h-5 text-white" />
              <h2 className="text-lg font-semibold text-white">Available Tenants</h2>
            </div>
            <span className="px-3 py-1 text-sm text-white bg-blue-500 rounded-full shadow">
              {users.users.length} tenant{users.users.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-lg divide-y divide-gray-100 border border-gray-100">
            {users.users.map((user) => (
              <a
                key={user.subdomain}
                href={`http://${user.subdomain}.localhost:3000`}
                className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 group"
              >
                <div className="space-y-1">
                  <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                    {user.subdomain}.localhost:3000
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </a>
            ))}

            {users.users.length === 0 && (
              <div className="p-8 text-center">
                <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No tenants available yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
