# Discord Bot Project

## Overview

This is a basic Discord bot built with Node.js and the discord.js library. The bot implements a simple slash command system and currently features a single "ping" command that responds with "Pong!". The project serves as a foundation for building more complex Discord bot functionality with proper command registration and event handling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Bot Architecture
- **Event-driven design**: Uses Discord.js client events (ClientReady, InteractionCreate) to handle bot lifecycle and user interactions
- **Slash command system**: Implements Discord's modern slash command interface rather than traditional text-based commands
- **Modular command structure**: Commands are defined as SlashCommandBuilder objects and registered with Discord's API

### Application Structure
- **Single-file architecture**: All bot logic is contained in `index.js` for simplicity
- **Environment-based configuration**: Uses dotenv for secure token and configuration management
- **Asynchronous operations**: Leverages async/await for Discord API interactions

### Command Registration
- **Automatic registration**: Commands are registered programmatically on startup
- **Guild-specific deployment**: Commands are registered to a specific Discord server (guild) for faster updates during development
- **REST API integration**: Uses Discord's REST API for command registration separate from the WebSocket connection

### Security Model
- **Token-based authentication**: Bot authenticates with Discord using a secure bot token
- **Environment variables**: Sensitive data (TOKEN, CLIENT_ID, GUILD_ID) stored in environment variables
- **Minimal permissions**: Bot requests only the Guilds intent, following principle of least privilege

## External Dependencies

### Discord Integration
- **discord.js v14**: Primary Discord API wrapper providing WebSocket client and REST API functionality
- **Discord Developer Portal**: Bot registration and token management through Discord's developer dashboard

### Development Dependencies
- **dotenv**: Environment variable management for secure configuration
- **@types/node**: TypeScript definitions for Node.js (development support)

### Runtime Requirements
- **Node.js**: JavaScript runtime environment (minimum version 16.11.0 as specified by discord.js)
- **Discord Bot Token**: Required authentication token from Discord Developer Portal
- **Guild/Server ID**: Target Discord server identifier for command registration