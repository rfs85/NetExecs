import { storage } from '../storage';

function mapId(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { ...rest, id: _id };
}

export const onRequestGet = async (context) => {
  try {
    const protocol = context.params.protocol;
    const name = context.params.name;
    const module = await storage.getModuleByName(protocol, name);
    if (!module) {
      return new Response(JSON.stringify({ message: 'Module not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(mapId(module)), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ message: 'Failed to fetch module' }), { status: 500 });
  }
}; 