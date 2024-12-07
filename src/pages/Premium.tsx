import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCrown, 
  faInfinity, 
  faMessage, 
  faGift,
  faStar,
  faShieldHeart,
  faArrowLeft,
  faDiamond,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const features = {
  premium: [
    {
      icon: faMessage,
      title: "Messages illimités",
      description: "Chattez sans limite avec tous vos contacts"
    },
    {
      icon: faGift,
      title: "Cadeaux exclusifs",
      description: "Accédez à des cadeaux virtuels premium"
    },
    {
      icon: faStar,
      title: "Profil mis en avant",
      description: "Apparaissez en priorité dans les recherches"
    }
  ],
  premiumPlus: [
    {
      icon: faShieldHeart,
      title: "Support prioritaire 24/7",
      description: "Une équipe dédiée à votre service"
    },
    {
      icon: faInfinity,
      title: "Fonctionnalités exclusives",
      description: "Accès anticipé aux nouvelles fonctionnalités"
    },
    {
      icon: faDiamond,
      title: "Badge Premium+",
      description: "Distinction unique sur votre profil"
    }
  ]
};

export default function Premium() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          
          <FontAwesomeIcon 
            icon={faCrown} 
            className="text-4xl text-yellow-400 mb-4" 
          />
          <h1 className="text-3xl font-bold mb-4 dark:text-white">
            Choisissez votre offre Premium
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sélectionnez l'abonnement qui correspond le mieux à vos besoins
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm">
              Populaire
            </div>
            
            <div className="text-center mb-8">
              <FontAwesomeIcon 
                icon={faCrown} 
                className="text-3xl text-yellow-400 mb-4" 
              />
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Premium</h2>
              <div className="mb-4">
                <span className="text-4xl font-bold dark:text-white">9.99€</span>
                <span className="text-gray-600 dark:text-gray-400">/mois</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {features.premium.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FontAwesomeIcon 
                    icon={faCheck} 
                    className="text-green-500" 
                  />
                  <div>
                    <p className="font-medium dark:text-white">{feature.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors">
              Choisir Premium
            </button>
          </motion.div>

          {/* Premium+ Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-white text-purple-500 px-4 py-1 rounded-bl-lg text-sm font-semibold">
              Premium+
            </div>
            
            <div className="text-center mb-8">
              <FontAwesomeIcon 
                icon={faDiamond} 
                className="text-3xl text-white mb-4" 
              />
              <h2 className="text-2xl font-bold mb-2">Premium+</h2>
              <div className="mb-4">
                <span className="text-4xl font-bold">49.99€</span>
                <span className="text-white/80">/mois</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[...features.premium, ...features.premiumPlus].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FontAwesomeIcon 
                    icon={faCheck} 
                    className="text-white" 
                  />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-white/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-white text-purple-500 rounded-xl font-semibold hover:bg-opacity-90 transition-colors">
              Choisir Premium+
            </button>
          </motion.div>
        </div>

        {/* Money back guarantee */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Garantie satisfait ou remboursé pendant 30 jours • Annulez à tout moment
        </p>
      </div>
    </div>
  );
}