'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Clock, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

interface ImageHistory {
  prompt: string;
  imageUrl: string;
  timestamp: string;
}

export default function ImageGallery() {
  const [history, setHistory] = useState<ImageHistory[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageHistory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  useEffect(() => {
    const savedHistory = localStorage.getItem('imageHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = history.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(history.length / imagesPerPage);

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'imagen-generada.png';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Historial de Imágenes
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {history.length} {history.length === 1 ? 'imagen' : 'imágenes'} generadas
        </span>
      </div>
      
      {history.length === 0 ? (
        <Card className="p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-3">
            <ImageIcon className="w-12 h-12 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              No hay imágenes generadas
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Las imágenes que generes aparecerán aquí
            </p>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentImages.map((item, index) => (
              <Card 
                key={index} 
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 border-purple-50 dark:border-purple-900/20"
              >
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={`Imagen generada ${index + 1}`}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/90 hover:bg-white"
                      onClick={() => handleDownload(item.imageUrl)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {item.prompt}
                  </p>
                  <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Página {currentPage} de {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Detalles de la Imagen
            </DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-6">
              <div className="relative group">
                <img
                  src={selectedImage.imageUrl}
                  alt="Imagen seleccionada"
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/90 hover:bg-white"
                    onClick={() => handleDownload(selectedImage.imageUrl)}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Prompt utilizado:
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedImage.prompt}
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Generada el: {new Date(selectedImage.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 