// NOTE: Make sure to install 'drizzle-orm' and '@neondatabase/serverless' in your functions package.json
// Cloudflare Pages Functions exposes environment variables on globalThis, not process.env
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import {
  savedCommands, modules, tutorials, protocols,
  type SavedCommand, type Module, type Tutorial, type Protocol
} from '../shared/schema';
import { eq } from 'drizzle-orm';

const DATABASE_URL = globalThis.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}
const sql = neon(DATABASE_URL);
const db = drizzle(sql);

export const storage = {
  // Saved Commands
  async getSavedCommands(): Promise<SavedCommand[]> {
    return await db.select().from(savedCommands);
  },
  async getSavedCommandById(id: number): Promise<SavedCommand | undefined> {
    const results = await db.select().from(savedCommands).where(eq(savedCommands.id, id));
    return results.length > 0 ? results[0] : undefined;
  },
  async createSavedCommand(command: Omit<SavedCommand, 'id'>): Promise<SavedCommand> {
    const results = await db.insert(savedCommands).values(command).returning();
    return results[0];
  },
  async deleteSavedCommand(id: number): Promise<void> {
    await db.delete(savedCommands).where(eq(savedCommands.id, id));
  },

  // Modules
  async getModules(): Promise<Module[]> {
    return await db.select().from(modules);
  },
  async getModulesByProtocol(protocolName: string): Promise<Module[]> {
    const protocolResults = await db.select().from(protocols).where(eq(protocols.name, protocolName));
    if (!protocolResults.length) return [];
    const protocolId = protocolResults[0].id;
    return await db.select().from(modules).where(eq(modules.protocolId, protocolId));
  },
  async getModuleByName(protocolName: string, moduleName: string): Promise<Module | undefined> {
    const protocolResults = await db.select().from(protocols).where(eq(protocols.name, protocolName));
    if (!protocolResults.length) return undefined;
    const protocolId = protocolResults[0].id;
    const results = await db.select().from(modules).where(eq(modules.protocolId, protocolId)).where(eq(modules.name, moduleName));
    return results.length > 0 ? results[0] : undefined;
  },

  // Tutorials
  async getTutorials(): Promise<Tutorial[]> {
    return await db.select().from(tutorials);
  },
  async getTutorialBySlug(slug: string): Promise<Tutorial | undefined> {
    const results = await db.select().from(tutorials).where(eq(tutorials.slug, slug));
    return results.length > 0 ? results[0] : undefined;
  },

  // Protocols
  async getProtocols(): Promise<Protocol[]> {
    return await db.select().from(protocols);
  },
}; 