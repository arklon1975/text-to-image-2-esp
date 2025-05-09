import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  try {
    const { prompt, negativePrompt, width, height } = await req.json();

    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt,
          negative_prompt: negativePrompt || "",
          width: width || 512,
          height: height || 512,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          prompt_strength: 0.8,
        }
      }
    );

    return NextResponse.json({ imageUrl: output[0] });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Error al generar la imagen" },
      { status: 500 }
    );
  }
}
