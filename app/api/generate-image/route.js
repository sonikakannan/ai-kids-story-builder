import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

const HF_API_URL = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev';
const HF_API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/datxglubl/image/upload`; // Correct API URL

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required to generate an image.' },
        { status: 400 }
      );
    }

    // Call Hugging Face API to generate the image
    
    const response = await axios.post(
      HF_API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer', // Handle binary image data
      }
    );

    // Convert the binary data to a base64-encoded string
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
   
    // Upload the base64 image to Cloudinary
    const formData = new FormData();
    formData.append('file', `data:image/png;base64,${base64Image}`);
    formData.append('upload_preset', 'ai-kids-story'); // Ensure this matches your Cloudinary unsigned upload preset

    // Make the request to Cloudinary without the Authorization header
    const cloudinaryResponse = await axios.post(CLOUDINARY_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Return the hosted image URL from Cloudinary
    return NextResponse.json({ imageUrl: cloudinaryResponse.data.secure_url });
  } catch (error) {
    console.error('Error generating or uploading image:', error.message);
    return NextResponse.json(
      { error: 'Failed to generate or upload image. Please try again later.' },
      { status: 500 }
    );
  }
}
