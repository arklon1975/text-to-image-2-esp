import ImageGenerator from '@/components/ImageGenerator';
import ImageGallery from '@/components/ImageGallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative">
        {/* Hero Section con efecto de overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
        
        <div className="container mx-auto px-4 py-24 relative">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="mb-6 inline-block">
              <span className="text-sm font-medium text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full">
                GENERADOR DE FOTOGRAFÍAS CON IA
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              Crea fotografías realistas con IA
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Genera fotografías profesionales en segundos usando nuestro Generador de Fotografías con IA.
              Experimenta con diferentes estilos fotográficos y descubre posibilidades infinitas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              <ImageGenerator />
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              <ImageGallery />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
