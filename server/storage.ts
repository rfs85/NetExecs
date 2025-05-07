import { 
  type SavedCommand, type Module, type Tutorial, type Protocol, 
  savedCommands, modules, tutorials, protocols,
  type InsertProtocol, type InsertModule, type InsertTutorial, type InsertSavedCommand
} from "@shared/schema";
import { modules as clientModules } from "../client/src/data/modules";
import { protocols as clientProtocols } from "../client/src/data/protocols";
import { tutorials as clientTutorials } from "../client/src/data/tutorials";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // Saved Commands
  getSavedCommands(): Promise<SavedCommand[]>;
  getSavedCommandById(id: number): Promise<SavedCommand | undefined>;
  createSavedCommand(command: Omit<SavedCommand, "id">): Promise<SavedCommand>;
  updateSavedCommand(id: number, command: Partial<SavedCommand>): Promise<SavedCommand | undefined>;
  deleteSavedCommand(id: number): Promise<void>;

  // Modules
  getModules(): Promise<Module[]>;
  getModulesByProtocol(protocol: string): Promise<Module[]>;
  getModuleByName(protocol: string, name: string): Promise<Module | undefined>;
  
  // Tutorials
  getTutorials(): Promise<Tutorial[]>;
  getTutorialBySlug(slug: string): Promise<Tutorial | undefined>;
  
  // Protocols
  getProtocols(): Promise<Protocol[]>;

  // Database initialization
  initializeDatabase(): Promise<void>;
}

// Class that handles database operations
export class DbStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql);
  }

  // Initialize the database with data from client files
  async initializeDatabase(): Promise<void> {
    try {
      // Clear existing data (in case we need to reinitialize)
      await this.clearDatabase();

      // First, insert protocols
      const protocolsData = this.prepareProtocolsData();
      const insertedProtocols = await this.db.insert(protocols).values(protocolsData).returning();
      console.log(`Inserted ${insertedProtocols.length} protocols`);

      // Next, insert modules
      const modulesData = this.prepareModulesData(insertedProtocols);
      const insertedModules = await this.db.insert(modules).values(modulesData).returning();
      console.log(`Inserted ${insertedModules.length} modules`);

      // Insert tutorials
      const tutorialsData = this.prepareTutorialsData();
      const insertedTutorials = await this.db.insert(tutorials).values(tutorialsData).returning();
      console.log(`Inserted ${insertedTutorials.length} tutorials`);

      // Insert saved commands
      const savedCommandsData = this.prepareSavedCommandsData();
      const insertedCommands = await this.db.insert(savedCommands).values(savedCommandsData).returning();
      console.log(`Inserted ${insertedCommands.length} saved commands`);

      console.log("Database initialization completed successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  private async clearDatabase(): Promise<void> {
    try {
      await this.db.delete(savedCommands);
      await this.db.delete(tutorials);
      await this.db.delete(modules);
      await this.db.delete(protocols);
      console.log("Cleared existing database data");
    } catch (error) {
      console.error("Error clearing database:", error);
      throw error;
    }
  }

  private prepareProtocolsData(): InsertProtocol[] {
    return clientProtocols.map(protocol => ({
      name: protocol.name,
      displayName: protocol.displayName,
      icon: protocol.icon,
      description: protocol.description
    }));
  }

  private prepareModulesData(insertedProtocols: Protocol[]): InsertModule[] {
    return clientModules.map(mod => {
      const protocol = insertedProtocols.find(p => p.name === mod.protocol);
      return {
        name: mod.name,
        protocolId: protocol ? protocol.id : 1,
        description: mod.description,
        stability: mod.stability,
        requiredParams: mod.requiredParams || null,
        optionalParams: mod.optionalParams || null,
        examples: mod.examples || null,
        output: mod.output || null,
        troubleshooting: mod.troubleshooting || null
      };
    });
  }

  private prepareTutorialsData(): InsertTutorial[] {
    return clientTutorials.map(tutorial => ({
      title: tutorial.title,
      slug: tutorial.slug,
      image: tutorial.image,
      description: tutorial.description,
      content: tutorial.content,
      level: tutorial.level,
      readTime: tutorial.readTime,
      tags: tutorial.tags
    }));
  }

  private prepareSavedCommandsData(): InsertSavedCommand[] {
    return [
      {
        name: "SMB Share Scanner",
        userId: null,
        protocol: "smb",
        target: "192.168.1.0/24",
        username: "Administrator",
        password: "Password123!",
        isHash: false,
        module: "shares",
        moduleParams: { "check-share-access": true },
        additionalOptions: { verbose: true },
        command: "netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares --verbose"
      },
      {
        name: "Domain User Enumeration",
        userId: null,
        protocol: "ldap",
        target: "192.168.1.10",
        username: "Administrator",
        password: "Password123!",
        isHash: false,
        module: "user_hunter",
        moduleParams: { "admin-count": true },
        additionalOptions: {},
        command: "netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' -M user_hunter -o ADMIN_COUNT=True"
      },
      {
        name: "Password Policy Check",
        userId: null,
        protocol: "ldap",
        target: "192.168.1.10",
        username: "Administrator",
        password: "Password123!",
        isHash: false,
        module: "",
        moduleParams: {},
        additionalOptions: {},
        command: "netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' --pass-pol"
      }
    ];
  }

  // Saved Commands methods
  async getSavedCommands(): Promise<SavedCommand[]> {
    return await this.db.select().from(savedCommands);
  }

  async getSavedCommandById(id: number): Promise<SavedCommand | undefined> {
    const results = await this.db.select().from(savedCommands).where(eq(savedCommands.id, id));
    return results.length > 0 ? results[0] : undefined;
  }

  async createSavedCommand(command: Omit<SavedCommand, "id">): Promise<SavedCommand> {
    const results = await this.db.insert(savedCommands).values(command).returning();
    return results[0];
  }

  async updateSavedCommand(id: number, command: Partial<SavedCommand>): Promise<SavedCommand | undefined> {
    const results = await this.db.update(savedCommands)
      .set(command)
      .where(eq(savedCommands.id, id))
      .returning();
    return results.length > 0 ? results[0] : undefined;
  }

  async deleteSavedCommand(id: number): Promise<void> {
    await this.db.delete(savedCommands).where(eq(savedCommands.id, id));
  }

  // Modules methods
  async getModules(): Promise<Module[]> {
    return await this.db.select().from(modules);
  }

  async getModulesByProtocol(protocol: string): Promise<Module[]> {
    const protocolRecord = await this.db.select().from(protocols).where(eq(protocols.name, protocol));
    if (protocolRecord.length === 0) return [];
    
    return await this.db.select().from(modules).where(eq(modules.protocolId, protocolRecord[0].id));
  }

  async getModuleByName(protocol: string, name: string): Promise<Module | undefined> {
    const protocolRecord = await this.db.select().from(protocols).where(eq(protocols.name, protocol));
    if (protocolRecord.length === 0) return undefined;
    
    const results = await this.db.select().from(modules)
      .where(and(
        eq(modules.protocolId, protocolRecord[0].id),
        eq(modules.name, name)
      ));
    
    return results.length > 0 ? results[0] : undefined;
  }

  // Tutorials methods
  async getTutorials(): Promise<Tutorial[]> {
    return await this.db.select().from(tutorials);
  }

  async getTutorialBySlug(slug: string): Promise<Tutorial | undefined> {
    const results = await this.db.select().from(tutorials).where(eq(tutorials.slug, slug));
    return results.length > 0 ? results[0] : undefined;
  }

  // Protocols methods
  async getProtocols(): Promise<Protocol[]> {
    return await this.db.select().from(protocols);
  }
}

// Memory storage implementation for fallback or testing
export class MemStorage implements IStorage {
  private savedCommands: Map<number, SavedCommand>;
  private modules: Module[];
  private tutorials: Tutorial[];
  private protocols: Protocol[];
  private currentId: number;

  constructor() {
    this.savedCommands = new Map();
    this.currentId = 1;
    
    // Initialize protocols first since modules depend on them
    this.protocols = this.convertClientProtocols();
    
    // Now initialize modules and tutorials
    this.modules = this.convertClientModules();
    this.tutorials = this.convertClientTutorials();
    
    // Initialize with some example saved commands
    this.initializeSavedCommands();
  }

  async initializeDatabase(): Promise<void> {
    // No-op for memory storage
    console.log("Using in-memory storage, no database initialization needed");
  }

  private convertClientModules(): Module[] {
    return clientModules.map(mod => ({
      id: this.generateId(),
      name: mod.name,
      protocolId: this.getProtocolIdByName(mod.protocol),
      description: mod.description,
      stability: mod.stability,
      requiredParams: mod.requiredParams || null,
      optionalParams: mod.optionalParams || null,
      examples: mod.examples || null,
      output: mod.output || null,
      troubleshooting: mod.troubleshooting || null
    }));
  }

  private convertClientTutorials(): Tutorial[] {
    return clientTutorials.map(tutorial => ({
      id: tutorial.id,
      title: tutorial.title,
      slug: tutorial.slug,
      image: tutorial.image,
      description: tutorial.description,
      content: tutorial.content,
      level: tutorial.level,
      readTime: tutorial.readTime,
      tags: tutorial.tags
    }));
  }

  private convertClientProtocols(): Protocol[] {
    return clientProtocols.map((protocol, index) => ({
      id: index + 1,  // Generate sequential IDs
      name: protocol.name,
      displayName: protocol.displayName,
      icon: protocol.icon,
      description: protocol.description
    }));
  }

  private getProtocolIdByName(name: string): number {
    const protocol = this.protocols.find(p => p.name === name);
    return protocol ? protocol.id : 1; // Default to first protocol if not found
  }

  private generateId(): number {
    return this.currentId++;
  }

  private initializeSavedCommands(): void {
    // SMB Share Scanner
    this.savedCommands.set(1, {
      id: 1,
      name: "SMB Share Scanner",
      userId: null,
      protocol: "smb",
      target: "192.168.1.0/24",
      username: "Administrator",
      password: "Password123!",
      isHash: false,
      module: "shares",
      moduleParams: { "check-share-access": true },
      additionalOptions: { verbose: true },
      command: "netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares --verbose"
    });

    // Domain User Enumeration
    this.savedCommands.set(2, {
      id: 2,
      name: "Domain User Enumeration",
      userId: null,
      protocol: "ldap",
      target: "192.168.1.10",
      username: "Administrator",
      password: "Password123!",
      isHash: false,
      module: "user_hunter",
      moduleParams: { "admin-count": true },
      additionalOptions: {},
      command: "netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' -M user_hunter -o ADMIN_COUNT=True"
    });

    // Password Policy Check
    this.savedCommands.set(3, {
      id: 3,
      name: "Password Policy Check",
      userId: null,
      protocol: "ldap",
      target: "192.168.1.10",
      username: "Administrator",
      password: "Password123!",
      isHash: false,
      module: "",
      moduleParams: {},
      additionalOptions: {},
      command: "netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' --pass-pol"
    });

    // Update current ID
    this.currentId = 4;
  }

  // Saved Commands methods
  async getSavedCommands(): Promise<SavedCommand[]> {
    return Array.from(this.savedCommands.values());
  }

  async getSavedCommandById(id: number): Promise<SavedCommand | undefined> {
    return this.savedCommands.get(id);
  }

  async createSavedCommand(command: Omit<SavedCommand, "id">): Promise<SavedCommand> {
    const id = this.generateId();
    const newCommand = { ...command, id };
    this.savedCommands.set(id, newCommand as SavedCommand);
    return newCommand as SavedCommand;
  }

  async updateSavedCommand(id: number, command: Partial<SavedCommand>): Promise<SavedCommand | undefined> {
    const existingCommand = this.savedCommands.get(id);
    if (!existingCommand) return undefined;

    const updatedCommand = { ...existingCommand, ...command };
    this.savedCommands.set(id, updatedCommand);
    return updatedCommand;
  }

  async deleteSavedCommand(id: number): Promise<void> {
    this.savedCommands.delete(id);
  }

  // Modules methods
  async getModules(): Promise<Module[]> {
    return this.modules;
  }

  async getModulesByProtocol(protocol: string): Promise<Module[]> {
    const protocolId = this.getProtocolIdByName(protocol);
    return this.modules.filter(module => module.protocolId === protocolId);
  }

  async getModuleByName(protocol: string, name: string): Promise<Module | undefined> {
    const protocolId = this.getProtocolIdByName(protocol);
    return this.modules.find(module => 
      module.protocolId === protocolId && module.name === name
    );
  }

  // Tutorials methods
  async getTutorials(): Promise<Tutorial[]> {
    return this.tutorials;
  }

  async getTutorialBySlug(slug: string): Promise<Tutorial | undefined> {
    return this.tutorials.find(tutorial => tutorial.slug === slug);
  }

  // Protocols methods
  async getProtocols(): Promise<Protocol[]> {
    return this.protocols;
  }
}

// Use database storage by default, fall back to in-memory if needed
let storage: IStorage;

try {
  if (process.env.DATABASE_URL) {
    console.log("Using database storage");
    storage = new DbStorage();
  } else {
    console.log("No DATABASE_URL provided, falling back to in-memory storage");
    storage = new MemStorage();
  }
} catch (error) {
  console.error("Error initializing database storage:", error);
  console.log("Falling back to in-memory storage");
  storage = new MemStorage();
}

export { storage };
