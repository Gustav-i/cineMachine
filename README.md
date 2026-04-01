# cineMachine 🎬

A movie search and tracking app powered by the [OMDb API](https://www.omdbapi.com/).

**Live demo:** [cine-machine.vercel.app](https://cine-machine.vercel.app)

## Features

- Search movies by title in real time
- View details (plot, director, cast, genre, runtime, IMDb rating)
- Rate movies with a custom star rating component
- Manage a personal watched list
- Watched list summary with average IMDb rating, personal rating, and total runtime
- Data persisted in `localStorage` — your list survives page reloads

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [OMDb API](https://www.omdbapi.com/)
- [Axios](https://axios-http.com/)
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build
```

> An OMDb API key is required. Set it in `src/data.ts`.
