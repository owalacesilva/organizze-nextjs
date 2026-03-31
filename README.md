# Organizze

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Project Structure
```plain
my-nextjs-app/
├── app/                          # App Router
│   ├── (auth)/                  # Route groups
│   ├── (dashboard)/
│   ├── (marketing)/
│   ├── api/                     # API routes
│   │   ├── auth/
│   │   ├── users/
│   │   ├── transactions/
│   │   └── webhooks/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── src/                         # Source code (optional)
│   ├── components/              # UI components
│   │   ├── ui/                  # Base UI components
│   │   ├── forms/               # Form components
│   │   ├── layout/              # Layout components
│   │   ├── charts/              # Chart components
│   │   └── modals/              # Modal components
│   ├── lib/                     # Core utilities
│   │   ├── api.ts               # API client
│   │   ├── auth.ts              # Authentication
│   │   ├── db.ts                # Database connection
│   │   ├── utils.ts             # Utilities
│   │   ├── validations/         # Schema validations
│   │   └── constants.ts         # App constants
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   └── useTransactions.ts
│   ├── context/                 # Context providers
│   │   ├── auth-context.tsx
│   │   └── theme-context.tsx
│   ├── store/                   # State management
│   │   ├── slices/
│   │   └── index.ts
│   ├── types/                   # TypeScript type definitions
│   │   ├── auth.ts
│   │   ├── api.ts
│   │   └── global.d.ts
│   └── styles/                  # Styling
│       ├── globals.css
│       ├── components.css
│       └── utilities.css
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   ├── logos/
│   └── documents/
├── docs/                        # Documentation
├── tests/                       # Test files
│   ├── __mocks__/
│   ├── components/
│   ├── pages/
│   └── utils/
├── prisma/                      # Database schema (if using Prisma)
├── .env.local                   # Environment variables
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```