import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Score from './pages/Score';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import PhotoTest from './pages/PhotoTest';
import PersonalityTest from './pages/PersonalityTest';
import PersonalityIntro from './pages/PersonalityIntro';
import PersonalityResults from './pages/PersonalityResults';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import BottomNav from './components/navigation/BottomNav';
import ScoreRedirect from './components/routing/ScoreRedirect';
import ScoreResults from './pages/ScoreResults';
import { useThemeStore } from './stores/themeStore';

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/photo-test" element={<PhotoTest />} />
              <Route path="/personality" element={<PersonalityIntro />} />
              <Route path="/personality-test" element={<PersonalityTest />} />
              <Route path="/personality-results" element={<PersonalityResults />} />
              <Route path="/score" element={<ScoreRedirect />} />
              <Route path="/score-results" element={<ScoreResults />} />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;