import { storage } from '../storage';

export const onRequestGet = async (context) => {
  try {
    const tutorials = await storage.getTutorials();
    return new Response(JSON.stringify(tutorials), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ message: 'Failed to fetch tutorials' }), { status: 500 });
  }
}; 