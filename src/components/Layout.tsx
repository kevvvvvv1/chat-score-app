import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import BottomNav from './navigation/BottomNav';
import { useNavigationStore } from '../stores/navigationStore';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isInChatConversation } = useNavigationStore();
  const shouldShowNav = !isHomePage && !isInChatConversation;

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <main className={`flex-1 ${isHomePage ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <div className={`min-h-full ${shouldShowNav ? 'pb-16' : ''}`}>
          <Outlet />
        </div>
      </main>
      {shouldShowNav && (
        <div className="fixed bottom-0 left-0 right-0 h-16 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <BottomNav />
        </div>
      )}
    </div>
  );
}

export default Layout;