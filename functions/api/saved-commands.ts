import { makeStorage } from '../storage';

function mapId(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { ...rest, id: _id };
}

export const onRequestGet = async (context) => {
  try {
    const storage = makeStorage(context.env.DATABASE_URL);
    const commands = await storage.getSavedCommands();
    return new Response(JSON.stringify(commands.map(mapId)), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ message: 'Failed to fetch saved commands' }), { status: 500 });
  }
};

export const onRequestPost = async (context) => {
  try {
    const body = await context.request.json();
    const storage = makeStorage(context.env.DATABASE_URL);
    const savedCommand = await storage.createSavedCommand(body);
    return new Response(JSON.stringify(mapId(savedCommand)), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ message: 'Failed to save command' }), { status: 500 });
  }
}; 