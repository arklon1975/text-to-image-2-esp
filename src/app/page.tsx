import ImageGenerator from '@/components/ImageGenerator';
import ImageGallery from '@/components/ImageGallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Generador de Imágenes con IA
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Crea imágenes únicas y sorprendentes utilizando inteligencia artificial avanzada.
            Solo describe lo que imaginas y deja que la IA haga su magia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky lg:top-8">
            <div className="transform transition-all hover:scale-[1.01]">
              <ImageGenerator />
            </div>
          </div>
          <div className="space-y-8">
            <ImageGallery />
          </div>
        </div>
      </div>
    </main>
  );
}
