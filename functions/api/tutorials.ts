import { makeStorage } from '../storage';

export const onRequestGet = async (context) => {
  try {
    const storage = makeStorage(context.env.DATABASE_URL);
    const tutorials = await storage.getTutorials();
    return new Response(JSON.stringify(tutorials), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ message: 'Failed to fetch tutorials' }), { status: 500 });
  }
}; 