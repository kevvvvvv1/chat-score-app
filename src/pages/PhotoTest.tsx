import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCamera, 
  faUpload, 
  faImage,
  faCircleCheck,
  faFaceSmile,
  faUsers,
  faLightbulb,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import Card from '../components/ui/Card';

const criteria = [
  {
    id: 'quality',
    icon: faCamera,
    title: 'Qualité de l\'image',
    description: 'Netteté, luminosité et résolution',
  },
  {
    id: 'expression',
    icon: faFaceSmile,
    title: 'Expression',
    description: 'Naturel et authenticité du visage',
  },
  {
    id: 'composition',
    icon: faImage,
    title: 'Composition',
    description: 'Cadrage et arrière-plan',
  },
  {
    id: 'engagement',
    icon: faEye,
    title: 'Engagement',
    description: 'Capacité à attirer l\'attention',
  }
];

export default function PhotoTest() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      analyzeImage();
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simuler l'analyse avec un délai
    setTimeout(() => {
      const newScores = criteria.reduce((acc, criterion) => ({
        ...acc,
        [criterion.id]: Math.floor(Math.random() * 31) + 70 // Score entre 70 et 100
      }), {});
      
      setScores(newScores);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getOverallScore = () => {
    if (Object.keys(scores).length === 0) return null;
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    return Math.round(total / Object.keys(scores).length);
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <FontAwesomeIcon 
            icon={faCamera} 
            className="text-4xl text-primary mb-4" 
          />
          <h1 className="text-3xl font-bold mb-4 dark:text-white">
            Testeur de Photo de Profil
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Notre outil d'analyse avancée évalue votre photo de profil selon plusieurs critères 
            pour maximiser son impact et votre attractivité sur la plateforme.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <div
            className={`p-8 border-2 border-dashed rounded-xl transition-colors ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300 dark:border-gray-700'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {!selectedImage ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon 
                    icon={faUpload} 
                    className="text-2xl text-gray-500 dark:text-gray-400" 
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  Déposez votre photo ici
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  ou
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Sélectionner une photo
                </button>
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="max-h-96 mx-auto rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* Results Section */}
        {isAnalyzing ? (
          <Card className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Analyse de votre photo en cours...
            </p>
          </Card>
        ) : selectedImage && Object.keys(scores).length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Overall Score */}
            <Card className="mb-8 p-8 text-center">
              <div className="text-6xl font-bold text-primary mb-4">
                {getOverallScore()}
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Score global
              </p>
            </Card>

            {/* Detailed Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              {criteria.map((criterion) => (
                <Card key={criterion.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon 
                        icon={criterion.icon} 
                        className="text-xl text-primary" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold dark:text-white">
                          {criterion.title}
                        </h3>
                        <span className="text-lg font-bold text-primary">
                          {scores[criterion.id]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {criterion.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : null}

        {/* Tips Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Conseils pour une photo parfaite
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <FontAwesomeIcon 
                icon={faLightbulb} 
                className="text-2xl text-yellow-400 mb-4" 
              />
              <h3 className="font-semibold mb-2 dark:text-white">Éclairage</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Privilégiez la lumière naturelle et évitez les contre-jours.
              </p>
            </Card>
            <Card className="p-6">
              <FontAwesomeIcon 
                icon={faUsers} 
                className="text-2xl text-green-500 mb-4" 
              />
              <h3 className="font-semibold mb-2 dark:text-white">Authenticité</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Restez naturel et montrez votre vraie personnalité.
              </p>
            </Card>
            <Card className="p-6">
              <FontAwesomeIcon 
                icon={faCircleCheck} 
                className="text-2xl text-blue-500 mb-4" 
              />
              <h3 className="font-semibold mb-2 dark:text-white">Qualité</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Utilisez une photo récente et de bonne résolution.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}