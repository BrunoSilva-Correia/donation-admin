# Donation Admin

**Donation Admin** is a frontend application built with [Vue.js](https://vuejs.org/) and [TypeScript](https://www.typescriptlang.org/), styled with [Tailwind CSS](https://tailwindcss.com/).
This project serves as an admin panel for managing donations and interacts with the backend API provided by the [donation-manager](https://github.com/BrunoSilva-Correia/donation-manager) project.

## Technologies

- [Vue.js 3](https://vuejs.org/) — Progressive JavaScript framework
- [TypeScript](https://www.typescriptlang.org/) — Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Yarn](https://yarnpkg.com/) — Fast and secure package manager

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Recommended version: 16.x or higher)
- [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/BrunoSilva-Correia/donation-admin.git
cd donation-admin
```

2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn serve
```

4. Access the app at:

```
http://localhost:8080
```

> ⚠️ Make sure the backend (`donation-manager`) is running and accessible.

## Available Scripts

- `yarn serve` — Starts the development server
- `yarn build` — Builds the app for production
- `yarn lint` — Runs code linting

## Project Structure

```
donation-admin/
├── public/               # Static assets
├── src/                  # Source code
│   ├── assets/           # Images and static resources
│   ├── components/       # Vue components
│   ├── views/            # Application views/pages
│   ├── router/           # Vue Router configuration
│   ├── store/            # State management (e.g., Pinia)
│   └── main.ts           # App entry point
├── .eslintrc.js          # ESLint configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project metadata and scripts
└── yarn.lock             # Dependency lock file
```

## API Integration

This application consumes the RESTful API provided by the [donation-manager](https://github.com/BrunoSilva-Correia/donation-manager) backend.
Make sure the API is running and properly configured for the admin panel to work correctly.

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests for improvements, bug fixes, or new features.

## License

This project is licensed under the [MIT License](LICENSE).
