'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Clock, ChevronLeft, ChevronRight, ImageIcon, Grid, List, Camera } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

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
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Galería de Fotografías
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-pink-500/20 text-pink-400'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-pink-500/20 text-pink-400'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-gray-800/50 animate-pulse"
            />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center backdrop-blur-sm">
            <Camera className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">
            No hay fotografías aún
          </h3>
          <p className="text-gray-400">
            Genera tu primera fotografía para verla aquí
          </p>
        </div>
      ) : (
        <div
          className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
              : 'space-y-6'
          }`}
        >
          {currentImages.map((image) => (
            <div
              key={image.imageUrl}
              className={`group relative ${
                viewMode === 'list' ? 'flex gap-6' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <div
                className={`${
                  viewMode === 'list'
                    ? 'w-48 flex-shrink-0'
                    : 'aspect-square'
                } rounded-xl overflow-hidden border border-gray-700/50 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-pink-500/10 cursor-pointer`}
              >
                <img
                  src={image.imageUrl}
                  alt={image.prompt}
                  className="w-full h-full object-cover"
                />
              </div>
              {viewMode === 'list' && (
                <div className="flex-1 py-4">
                  <p className="text-gray-200 font-medium mb-2 line-clamp-2">
                    {image.prompt}
                  </p>
                  <p className="text-sm text-gray-400">
                    Generada el {new Date(image.timestamp).toLocaleDateString()}
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(image.imageUrl);
                  }}
                  className="p-3 rounded-full bg-gray-900/90 text-white shadow-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 backdrop-blur-sm"
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-700/50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400">
              Página {currentPage} de {totalPages}
            </span>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-700/50"
          >
            Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-200">
              Detalles de la Fotografía
            </DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-6">
              <div className="relative group">
                <img
                  src={selectedImage.imageUrl}
                  alt="Fotografía seleccionada"
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-gray-900/90 border-gray-700 text-white hover:bg-gray-800/90 backdrop-blur-sm"
                    onClick={() => handleDownload(selectedImage.imageUrl)}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">
                    Prompt utilizado:
                  </h3>
                  <p className="text-gray-400">
                    {selectedImage.prompt}
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
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