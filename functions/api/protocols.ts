import { makeStorage } from '../storage';

function mapId(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { ...rest, id: _id };
}

export const onRequestGet = async (context) => {
  try {
    const storage = makeStorage(context.env.DATABASE_URL);
    const protocols = await storage.getProtocols();
    return new Response(JSON.stringify(protocols.map(mapId)), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ message: 'Failed to fetch protocols' }), { status: 500 });
  }
}; 