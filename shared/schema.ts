import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Protocol schema
export const protocols = pgTable("protocols", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
});

export const insertProtocolSchema = createInsertSchema(protocols).pick({
  name: true,
  displayName: true,
  icon: true,
  description: true,
});

// Module schema
export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  protocolId: integer("protocol_id").notNull(),
  description: text("description").notNull(),
  stability: text("stability").notNull(),
  requiredParams: jsonb("required_params"),
  optionalParams: jsonb("optional_params"),
  examples: jsonb("examples"),
  output: text("output"),
  troubleshooting: jsonb("troubleshooting"),
});

export const insertModuleSchema = createInsertSchema(modules).pick({
  name: true,
  protocolId: true,
  description: true,
  stability: true,
  requiredParams: true,
  optionalParams: true,
  examples: true,
  output: true,
  troubleshooting: true,
});

// Tutorial schema
export const tutorials = pgTable("tutorials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image"),
  description: text("description").notNull(),
  content: text("content").notNull(),
  level: text("level").notNull(),
  readTime: integer("read_time").notNull(),
  tags: jsonb("tags"),
});

export const insertTutorialSchema = createInsertSchema(tutorials).pick({
  title: true,
  slug: true,
  image: true,
  description: true,
  content: true,
  level: true,
  readTime: true,
  tags: true,
});

// Saved command schema
export const savedCommands = pgTable("saved_commands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: integer("user_id"),
  protocol: text("protocol").notNull(),
  target: text("target"),
  username: text("username"),
  password: text("password"),
  isHash: boolean("is_hash").default(false),
  module: text("module"),
  moduleParams: jsonb("module_params"),
  additionalOptions: jsonb("additional_options"),
  command: text("command").notNull(),
});

export const insertSavedCommandSchema = createInsertSchema(savedCommands).pick({
  name: true,
  userId: true,
  protocol: true,
  target: true,
  username: true,
  password: true,
  isHash: true,
  module: true,
  moduleParams: true,
  additionalOptions: true,
  command: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Protocol = typeof protocols.$inferSelect;
export type InsertProtocol = z.infer<typeof insertProtocolSchema>;

export type Module = typeof modules.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;

export type Tutorial = typeof tutorials.$inferSelect;
export type InsertTutorial = z.infer<typeof insertTutorialSchema>;

export type SavedCommand = typeof savedCommands.$inferSelect;
export type InsertSavedCommand = z.infer<typeof insertSavedCommandSchema>;
