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
import { Sparkles, Download, Image as ImageIcon } from 'lucide-react';

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
    <Card className="p-6 shadow-lg border-2 border-purple-100 dark:border-purple-900 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
            Describe tu imagen
          </label>
          <Textarea
            {...form.register('prompt')}
            placeholder="Un astronauta montando un caballo en Marte, estilo realista..."
            className="min-h-[120px] bg-white dark:bg-gray-800"
          />
          {form.formState.errors.prompt && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.prompt.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
            Elementos a evitar (opcional)
          </label>
          <Textarea
            {...form.register('negativePrompt')}
            placeholder="Elementos que no quieres que aparezcan en la imagen..."
            className="min-h-[80px] bg-white dark:bg-gray-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Ancho
            </label>
            <Input
              type="number"
              {...form.register('width', { valueAsNumber: true })}
              min={256}
              max={1024}
              step={64}
              className="bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Alto
            </label>
            <Input
              type="number"
              {...form.register('height', { valueAsNumber: true })}
              min={256}
              max={1024}
              step={64}
              className="bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5" />
              Generar Imagen
            </>
          )}
        </Button>

        {isGenerating && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Generando imagen... Esto puede tomar unos momentos.
            </p>
          </div>
        )}

        {generatedImage && (
          <div className="mt-6 space-y-4">
            <div className="relative group">
              <img
                src={generatedImage}
                alt="Imagen generada"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/90 hover:bg-white"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = generatedImage;
                    link.download = 'imagen-generada.png';
                    link.click();
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </Card>
  );
} 