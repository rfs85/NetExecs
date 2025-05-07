import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for saved commands
  app.get('/api/saved-commands', async (req, res) => {
    try {
      const commands = await storage.getSavedCommands();
      res.json(commands);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch saved commands' });
    }
  });

  app.post('/api/saved-commands', async (req, res) => {
    try {
      const command = req.body;
      const savedCommand = await storage.createSavedCommand(command);
      res.status(201).json(savedCommand);
    } catch (error) {
      res.status(500).json({ message: 'Failed to save command' });
    }
  });

  app.delete('/api/saved-commands/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSavedCommand(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete command' });
    }
  });

  // API routes for modules
  app.get('/api/modules', async (req, res) => {
    try {
      const modules = await storage.getModules();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch modules' });
    }
  });

  app.get('/api/modules/:protocol', async (req, res) => {
    try {
      const protocol = req.params.protocol;
      const modules = await storage.getModulesByProtocol(protocol);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch modules' });
    }
  });

  app.get('/api/modules/:protocol/:name', async (req, res) => {
    try {
      const protocol = req.params.protocol;
      const name = req.params.name;
      const module = await storage.getModuleByName(protocol, name);
      
      if (!module) {
        return res.status(404).json({ message: 'Module not found' });
      }
      
      res.json(module);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch module' });
    }
  });

  // API routes for tutorials
  app.get('/api/tutorials', async (req, res) => {
    try {
      const tutorials = await storage.getTutorials();
      res.json(tutorials);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tutorials' });
    }
  });

  app.get('/api/tutorials/:slug', async (req, res) => {
    try {
      const slug = req.params.slug;
      const tutorial = await storage.getTutorialBySlug(slug);
      
      if (!tutorial) {
        return res.status(404).json({ message: 'Tutorial not found' });
      }
      
      res.json(tutorial);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tutorial' });
    }
  });

  // API routes for protocols
  app.get('/api/protocols', async (req, res) => {
    try {
      const protocols = await storage.getProtocols();
      res.json(protocols);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch protocols' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
