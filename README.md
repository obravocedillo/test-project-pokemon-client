# Test Project Pokemon Client

A practice project showcasing the use of different technologies on the frontend, 
following an architecture that separates concerns across pages, components and store. 
It uses reusable generic components, Pinia and a reusable api service

## Tech Stack
- Vue + TypeScript + Vite
- Pinia
- Prime Vue
- Tailwind CSS
- Vitest + MSW

## Architecture
- Generic components — reusable components like PokemonCard and PokemonList
- Reusable API service handles fetching data and can be extended to fetch information from specific services like pokemon API
- Unit test covering utility functions and integration tests covering the main flow path
- CI/CD pipeline builds a Docker image and deploys automatically to a VPS via Coolify webhook, with Cloudflare in front for security


## Project Structure
src/
  components/   — Reusable UI components
  pages/        — Feature pages
  store/        — Pinia stores
  router/       — Application routes
  services/     — API base class and Pokemon service
  composables/  — Shared composables
  types/        — Shared TypeScript interfaces
  mocks/        — MSW handlers and test server setup
  utility/      — Helper functions
  constants/    — Constants


## Getting Started
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
