import { storage } from '../storage';

function mapId(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { ...rest, id: _id };
}

export const onRequestDelete = async (context) => {
  try {
    const id = context.params.id;
    await storage.deleteSavedCommand(id);
    return new Response(null, { status: 204 });
  } catch {
    return new Response(JSON.stringify({ message: 'Failed to delete command' }), { status: 500 });
  }
}; 