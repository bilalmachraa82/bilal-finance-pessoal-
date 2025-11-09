# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Bilal Finance AI** is a mobile-first, AI-powered personal finance dashboard built with React 19, TypeScript, and Vite. It features conversational finance assistance, receipt scanning with AI vision, and predictive analytics using Google Gemini AI. The design uses a neomorphic glassmorphism aesthetic with a dark gradient background.

**Key Context:** This is a personalized application for Bilal Machraa, located in Sintra, Portugal. All UI text is in Portuguese (Portugal), and all financial data uses EUR currency with pt-PT locale formatting.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

**Required:** Create a `.env.local` file in the root directory:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note:** Vite maps `GEMINI_API_KEY` to `process.env.API_KEY` in the application code (see vite.config.ts:13).

## Architecture

### Tech Stack
- **Framework:** React 19.2.0 with TypeScript 5.8.2
- **Build Tool:** Vite 6.2.0 (ES modules)
- **AI Integration:** Google Gemini AI SDK (@google/genai)
- **Charts:** Recharts 3.3.0
- **Icons:** Lucide React
- **Styling:** TailwindCSS (loaded via CDN in index.html)

### Application Structure

**Entry Flow:**
1. `index.html` → loads React and dependencies from AI Studio CDN
2. `index.tsx` → React entry point, renders App component
3. `App.tsx` → Main shell with tab-based navigation (Dashboard, Chat, Scanner)

**State Management:** React hooks only (no Redux/Zustand). All data is currently mocked in `constants.ts`.

**Data Flow:**
- `constants.ts` contains `USER_PROFILE_DATA`, `MOCK_TRANSACTIONS`, and `MOCK_CASHFLOW_DATA`
- Components receive data via props
- AI services communicate with Gemini API and return structured responses

### Key Directories

```
/home/user/bilal-finance-pessoal-/
├── components/           # React components (Dashboard, ChatInterface, ReceiptScanner, etc.)
├── services/            # External service integrations (geminiService.ts)
├── App.tsx             # Main app shell with navigation
├── types.ts            # TypeScript interfaces
├── constants.ts        # Mock data and user profile
└── vite.config.ts      # Build configuration
```

## Important Patterns & Conventions

### Design System

**Color Scheme:**
- Primary accent: `#00FF88` (bright green)
- Background gradient: `from-slate-900 to-slate-950`
- Glass cards: `bg-slate-800/30 backdrop-blur-xl`
- Text hierarchy: `text-slate-100/200/300/400`

**Glassmorphism Pattern:** Use the `GlassCard` component for consistent styling:
```tsx
<GlassCard>
  {/* content */}
</GlassCard>
```

### Language & Localization

**All user-facing text must be in Portuguese (Portugal):**
- UI labels, buttons, messages
- AI prompts and responses (see services/geminiService.ts:28, :67)
- Error messages
- Chart labels

**Currency Formatting:** Always use EUR with pt-PT locale:
```tsx
balance.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })
```

### AI Integration

**Two main AI functions in `services/geminiService.ts`:**

1. **`getFinancialInsight(userMessage: string)`** - Conversational AI
   - Uses Gemini 2.5 Flash model
   - Receives full user profile context (banks, properties, cash flows)
   - Returns Portuguese responses
   - See implementation at services/geminiService.ts:21-61

2. **`analyzeReceipt(file: File)`** - Receipt scanning with Vision API
   - Extracts structured data (vendor, date, total, items)
   - Returns typed `ReceiptData` object
   - Handles errors gracefully with Portuguese messages
   - See implementation at services/geminiService.ts:63-113

**API Key Access:** The Gemini API key is accessed via `process.env.API_KEY` (not `GEMINI_API_KEY`).

### User Profile Context

The application is personalized for **Bilal Machraa** with specific financial context in `constants.ts:11-65`:

- **Properties:** 3 properties (Residência Sintra, Investimento Monte da Caparica, Aluguer Fontanelas)
- **Banks:** Millennium BCP, Revolut, Wizink
- **Complex Cash Flows:**
  - Monte da Caparica: €260.29 loan payment, €550 monthly rental income
  - Fontanelas: €600 landlord rent paid, €749 tenant income, €149 net profit

When adding features or modifying AI prompts, include this context for personalized insights.

### Component Patterns

**Component Composition:** Reusable wrappers for consistent UI:
- `GlassCard` - Glassmorphism container (components/GlassCard.tsx)
- `SummaryCard` - Stat display cards (components/SummaryCard.tsx)
- `Icon` - Lucide icon wrapper (components/Icon.tsx)

**Tab Navigation:** App.tsx:35-40 manages active tab state. Add new tabs by:
1. Adding tab to navigation array
2. Adding conditional render in main content area
3. Creating corresponding component in `components/`

### TypeScript Notes

**Path Alias:** `@/*` resolves to root directory (configured in vite.config.ts:15 and tsconfig.json:17).

**Import Extensions:** TypeScript allows importing `.ts` files directly (tsconfig.json:14).

**Type Definitions:** All interfaces in `types.ts`:
- `Transaction` - Financial transactions
- `Account` - Bank accounts (uses Portuguese property names: `tipo`, `operações`)
- `UserProfile` - Complete user financial profile
- `CashflowDataPoint` - Chart data structure
- `ReceiptData` - Receipt scanning results

## Deployment Context

This app targets **AI Studio** deployment, which is why:
- Dependencies are loaded from `aistudiocdn.com` in index.html
- No separate CSS files (TailwindCSS via CDN)
- Import maps define module resolution
- Vite server binds to `0.0.0.0:3000` for cloud access

## Testing & Quality

**Current State:** No test framework or linting configured. When adding tests:
- Consider Vitest (already using Vite)
- Test AI service mocks separately from actual API calls
- Focus on component rendering and user interactions

## Common Development Tasks

### Adding a New Transaction Type
1. Update `Transaction` interface in types.ts
2. Add new transaction to `MOCK_TRANSACTIONS` in constants.ts
3. Update `TransactionList` component to display new fields

### Modifying AI Behavior
1. Edit prompts in `services/geminiService.ts`
2. Maintain Portuguese language in all prompts
3. Include relevant user profile context from `USER_PROFILE_DATA`

### Adding a New Dashboard Card
1. Create component in `components/`
2. Use `GlassCard` wrapper for consistent styling
3. Import and add to `Dashboard.tsx`
4. Follow color scheme and text hierarchy

### Updating User Profile
1. Edit `USER_PROFILE_DATA` in constants.ts
2. Ensure Portuguese text for all labels
3. Update AI prompts if adding new financial context

## Important Files Reference

- **App.tsx:35-40** - Tab navigation logic
- **constants.ts:11-65** - User profile and financial context
- **services/geminiService.ts:21-113** - AI integration logic
- **types.ts:1-48** - All TypeScript interfaces
- **vite.config.ts:13** - Environment variable mapping
