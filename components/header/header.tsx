import Notification from './notifications/notification';
import { LogOut } from 'lucide-react';
import { signOut } from '@/lib/actions/auth';

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-normal">Rewards Hub</h1>
        <div className="flex items-center gap-3">
          <Notification />
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </form>
        </div>
      </div>
      <p className="text-gray-600">Earn points, unlock rewards, and celebrate your progress!</p>
    </header>
  );
}
