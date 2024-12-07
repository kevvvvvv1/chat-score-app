import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2000&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Tagline */}
            <p className="text-3xl font-bold text-white mb-8">
              Maintenant vous gérez.
            </p>

            {/* Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/chat')}
                className="w-full p-4 bg-primary text-white rounded-xl text-lg font-bold uppercase hover:bg-opacity-90 transition-colors shadow-lg shadow-primary/20"
              >
                Start Chatting
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/score')}
                className="flex items-center justify-center gap-2 mx-auto text-gray-300 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faChartLine} className="text-sm" />
                <span className="text-sm">Tester mon score</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;