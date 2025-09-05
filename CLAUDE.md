# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**

- `bun run dev` or `bun dev` - Start development server with Turbo (recommended)
- `bun run build` - Build for production with Turbo
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Architecture

This is a Next.js 15 application using the App Router architecture with the following structure:

- **Framework:** Next.js 15.5.2 with App Router
- **Runtime:** Uses Turbo for faster builds and development
- **Styling:** Tailwind CSS v4 with PostCSS
- **Fonts:** Geist Sans and Geist Mono via next/font/google
- **TypeScript:** Configured with strict mode and path aliases (`@/*` maps to root)

**Key Files:**

- `app/layout.tsx` - Root layout with font configuration and metadata
- `app/page.tsx` - Main homepage component
- `app/globals.css` - Global Tailwind styles
- `next.config.ts` - Next.js configuration (minimal default setup)
- `tsconfig.json` - TypeScript configuration with `@/*` path alias

**Project Structure:**

- Uses App Router in `app/` directory
- Currently a fresh Next.js template with minimal customization
- No additional routing, components, or features implemented yet

## Development Notes

- This project uses Bun for package management (bun.lock present)
- Turbo is enabled for both dev and build commands for improved performance
- TypeScript is configured with strict mode enabled
- Path alias `@/*` is available for imports from the root directory

## Package manager

- Always use bun as a package manager
