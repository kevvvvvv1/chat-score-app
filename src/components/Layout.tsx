import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './navigation/BottomNav';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>
      {!isHomePage && <BottomNav />}
    </div>
  );
}

export default Layout;