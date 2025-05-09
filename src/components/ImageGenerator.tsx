'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles, Download, Image as ImageIcon, Camera } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(1, 'El prompt es requerido'),
  negativePrompt: z.string().optional(),
  width: z.number().min(256).max(1024).default(512),
  height: z.number().min(256).max(1024).default(512),
});

type FormData = z.infer<typeof formSchema>;

export default function ImageGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      negativePrompt: '',
      width: 512,
      height: 512,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsGenerating(true);
      setProgress(0);

      const response = await fetch('/api/replicate/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al generar la imagen');
      }

      const result = await response.json();
      setGeneratedImage(result.imageUrl);
      
      const history = JSON.parse(localStorage.getItem('imageHistory') || '[]');
      history.unshift({
        prompt: data.prompt,
        imageUrl: result.imageUrl,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('imageHistory', JSON.stringify(history));

      toast({
        title: '¡Imagen generada!',
        description: 'La imagen se ha generado exitosamente.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un error al generar la imagen. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
      setProgress(100);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="prompt" className="text-lg font-medium text-gray-200">
              Describe la fotografía que deseas crear
            </label>
            {isGenerating && (
              <span className="text-sm text-pink-500 animate-pulse">
                Generando fotografía...
              </span>
            )}
          </div>
          <div className="relative">
            <textarea
              id="prompt"
              {...form.register('prompt')}
              placeholder="Ej: Retrato de una mujer joven en un café parisino, luz natural, estilo fotográfico profesional, Canon EOS R5, 85mm f/1.4"
              className="w-full h-32 px-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
              disabled={isGenerating}
            />
            <div className="absolute bottom-3 right-3">
              <button
                type="submit"
                disabled={isGenerating || !form.watch('prompt')}
                className={`px-6 py-2 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-pink-500 ${
                  isGenerating
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-pink-500/25"
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span>Generando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Crear Fotografía</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {form.formState.errors.prompt && (
          <div className="p-4 rounded-xl bg-red-900/20 border border-red-800">
            <p className="text-red-400">{form.formState.errors.prompt.message}</p>
          </div>
        )}
      </form>

      {generatedImage && (
        <div className="space-y-4">
          <div className="relative group">
            <div className="aspect-square rounded-xl overflow-hidden border border-gray-700 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-pink-500/10">
              <img
                src={generatedImage}
                alt="Fotografía generada"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = generatedImage;
                  link.download = 'fotografia-generada.png';
                  link.click();
                }}
                className="p-3 rounded-full bg-gray-900/90 text-white shadow-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 backdrop-blur-sm"
              >
                <Download className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 