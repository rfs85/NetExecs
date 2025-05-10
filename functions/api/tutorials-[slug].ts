import { storage } from '../storage';

function mapId(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { ...rest, id: _id };
}

export const onRequestGet = async (context) => {
  try {
    const slug = context.params.slug;
    const tutorial = await storage.getTutorialBySlug(slug);
    if (!tutorial) {
      return new Response(JSON.stringify({ message: 'Tutorial not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(mapId(tutorial)), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ message: 'Failed to fetch tutorial' }), { status: 500 });
  }
}; 