# Generador de Imágenes con IA

![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC)
![Replicate](https://img.shields.io/badge/Replicate-SDXL-orange)

Una aplicación web moderna para generar imágenes realistas utilizando Inteligencia Artificial. Construida con Next.js 14, TypeScript, Tailwind CSS y la API de Replicate.

## 🚀 Características

- ✨ Generación de imágenes de alta calidad usando Stable Diffusion XL
- 🎨 Interfaz de usuario moderna y responsive
- 📱 Diseño adaptable a todos los dispositivos
- 🔄 Generación de imágenes en tiempo real
- 💾 Historial local de imágenes generadas
- 🎯 Validación de formularios con Zod
- 🎨 Estilos modernos con Tailwind CSS
- 🔒 Manejo seguro de API keys

## 🛠️ Tecnologías

- [Next.js 14](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Replicate](https://replicate.com/) - API de IA para generación de imágenes
- [React Hook Form](https://react-hook-form.com/) - Manejo de formularios
- [Zod](https://zod.dev/) - Validación de esquemas
- [Radix UI](https://www.radix-ui.com/) - Componentes de UI accesibles

## 📋 Prerrequisitos

- Node.js 18.0 o superior
- npm o yarn
- Cuenta en [Replicate](https://replicate.com/) para obtener una API key

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/arklon1975/text-to-image-2-esp.git
cd text-to-image-2-esp
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Crea un archivo `.env.local` en la raíz del proyecto y añade tu API key de Replicate:
```env
REPLICATE_API_TOKEN=tu_api_key_aquí
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎨 Uso

1. Escribe una descripción detallada de la imagen que deseas generar
2. Opcionalmente, añade un prompt negativo para excluir elementos no deseados
3. Haz clic en "Crear Fotografía"
4. Espera a que la imagen se genere
5. Descarga la imagen generada o genera una nueva

## 📝 Ejemplos de Prompts

- "Retrato de una mujer joven en un café parisino, luz natural, estilo fotográfico profesional"
- "Paisaje montañoso al atardecer, estilo cinematográfico, gran angular"
- "Bodegón de frutas en un estudio fotográfico, iluminación dramática"

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Victor Gil** - *Desarrollo inicial* - [@arklon1975](https://github.com/arklon1975)

## 🙏 Agradecimientos

- [Replicate](https://replicate.com/) por proporcionar la API de Stable Diffusion
- [Next.js](https://nextjs.org/) por el increíble framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [Vercel](https://vercel.com/) por la plataforma de hosting