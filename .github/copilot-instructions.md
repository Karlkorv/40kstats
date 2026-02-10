# Copilot Instructions for 40kstats

## Project Overview

This is a Warhammer 40k leaderboard application built as part of the DH2642 project assignment. The application allows users to create, track, and view matches for the tabletop game Warhammer 40k.

**Technology Stack:**
- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6.2.2
- **State Management:** MobX 6.8.0 with mobx-react-lite
- **UI Library:** Material UI (MUI) 5.15
- **Routing:** React Router DOM 6.8
- **Backend:** Firebase (Firestore database, hosting, authentication)
- **Node Version:** Node.js 21 (as specified in CI workflows)

**Key Features:**
- User authentication and profile management
- Match creation with persistence (survives page refresh)
- Match history with filtering and search
- Tournament bracket visualization
- Real-time connection status monitoring
- Responsive Material UI design

## Build and Validation

### Prerequisites
- Node.js version 21 (specified in CI workflows)
- npm (comes with Node.js)

### Setup Steps
**IMPORTANT:** Always run `npm ci` (not `npm install`) before building to ensure consistent dependencies matching package-lock.json.

```bash
# Install dependencies (use npm ci, not npm install)
npm ci

# Start development server (runs on port 8000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```

### Development Server
The development server runs on **port 8000** (configured in vite.config.ts).

### Build Output
- Build output directory: `dist/`
- Source maps are enabled
- Minification is disabled (configured in vite.config.ts)

### Type Checking
Run TypeScript type checking with:
```bash
tsc
```
**Note:** The TypeScript configuration has `noEmit: true`, so running `tsc` only performs type checking without generating output files.

### Linting
This project uses super-linter for code quality checks. The linting check runs automatically on all pushes via GitHub Actions.

## CI/CD Workflows

The project has three GitHub Actions workflows that run on push:

1. **Linting Check** (`.github/workflows/linting-check.yml`)
   - Uses super-linter v6.5.0
   - Runs on every push
   - Requires full git history (fetch-depth: 0)

2. **TypeScript Type Check** (`.github/workflows/typescript-check-types.yml`)
   - Runs on every push
   - Steps: `npm ci` → `tsc`
   - Uses Node.js version 21

3. **Firebase Hosting Deploy** (`.github/workflows/firebase-hosting-merge.yml`)
   - Runs on push to `main` branch or manual trigger
   - Steps: `npm ci && npm run build` → Firebase deploy
   - Requires Firebase environment variables (secrets)
   - Deploys to Firebase project: leaderboard-a4f8b

**Important:** Always ensure changes pass TypeScript type checking (`tsc`) before committing, as this is validated in CI.

## Project Structure

### Root Configuration Files
- `package.json` - Dependencies and npm scripts (type: "module")
- `tsconfig.json` - TypeScript configuration (strict: false, noEmit: true)
- `vite.config.ts` - Vite build configuration
- `firebase.json` - Firebase hosting configuration (public: "dist")
- `firestore.rules` - Firestore security rules
- `firestore.indexes.json` - Firestore database indexes
- `.gitignore` - Git ignore patterns
- `index.html` - Entry HTML file

### Source Code Organization (`src/`)

The application follows a **Model-View-Presenter (MVP)** architecture pattern:

- **`src/model/`** - Data models and business logic
  - `LeaderboardModel.ts` - Main application state (MobX store)
  - `FormModel.ts` - Form state management
  - `match.ts` - Match data structures and types
  - `factions.ts` - Warhammer 40k faction definitions

- **`src/presenters/`** - Presenter layer connecting models to views
  - `homePresenter.tsx` - Home screen presenter
  - `matchCreatorPresenter.tsx` - Match creation presenter
  - `matchPresenter.tsx` - Individual match details presenter
  - `latestMatchesPresenter.tsx` - Match history presenter
  - `tournamentPresenter.tsx` - Tournament bracket presenter
  - `navbarPresenter.tsx` - Navigation bar presenter
  - `helpButtonDialogPresenter.tsx` - Help dialog presenter

- **`src/views/`** - React view components (UI layer)
  - `matchCreatorView.tsx` - Match creation form
  - `matchView.tsx` - Match details display
  - `latestMatchesView.tsx` - Match history list
  - `tournamentView.tsx` - Tournament bracket visualization
  - `navbarView.tsx` - Navigation bar
  - `helpButtonDialogView.tsx` - Help dialog
  - `errorView.tsx` - Error boundary fallback

- **`src/Firebase.ts`** - Firebase configuration and initialization
- **`src/App.tsx`** - Root application component with routing setup
- **`src/index.tsx`** - Application entry point
- **`src/style.css`** - Global styles

### Routing Structure
The application uses hash-based routing (createHashRouter):
- `/` - Home screen
- `/matchCreator` - Match creation form
- `/tournament` - Tournament bracket view
- `/match/:matchId` - Individual match details (dynamic route)

## Architecture and Patterns

### State Management
- Uses MobX for reactive state management
- Main store: `LeaderBoardModel` passed as props throughout the component tree
- Observers: Components wrapped with `observer()` from mobx-react-lite

### Firebase Integration
- Authentication: Firebase Auth for user login
- Database: Firestore for storing matches and user data
- Hosting: Firebase Hosting for production deployment
- Environment variables: Firebase config stored in VITE_* environment variables

### Error Handling
- React Error Boundary wraps the entire application
- Custom ErrorView component for fallback UI
- Connection status monitoring with alerts

### UI Patterns
- Material UI theming with custom primary color (#9c1116)
- Responsive design
- Loading states with CircularProgress
- Slide transitions for alerts
- Modal dialogs for help and forms

## Important Notes

1. **Always use `npm ci`** instead of `npm install` to ensure consistency with CI environment
2. **Type checking is strict in CI** - Run `tsc` locally before committing
3. **Firebase secrets required** - Local development may need Firebase configuration
4. **Port 8000** is hardcoded for development server
5. **Hash routing** is used (not browser history) - URLs will have `#` in them
6. **MobX observers** - Components accessing model state must be wrapped with `observer()`
7. **TypeScript strict mode is OFF** - The project uses `strict: false` in tsconfig.json

## Testing

Currently, this project does not have a dedicated test suite. Validation is performed through:
- TypeScript type checking (`tsc`)
- Linting via super-linter in CI
- Manual testing of the application

## Common Pitfalls

1. **Missing `npm ci`** - Always install dependencies before building
2. **Wrong Node version** - Ensure Node.js 21 is used (CI requirement)
3. **TypeScript errors** - Check with `tsc` before committing
4. **MobX reactivity** - Forgetting to wrap components with `observer()`
5. **Firebase env vars** - Build may fail without proper Firebase configuration
6. **Module resolution** - Project uses `"module": "NodeNext"` and `"moduleResolution": "NodeNext"`

## Making Changes

When implementing changes:
1. Install dependencies: `npm ci`
2. Make your code changes
3. Run type check: `tsc`
4. Test locally: `npm run dev` (opens on localhost:8000)
5. Build to verify: `npm run build`
6. Commit changes - CI will validate linting and type checking

Trust these instructions and only search for additional information if details are missing or found to be incorrect.
