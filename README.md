# Semmozhi Workshop OS

A comprehensive, modern open-source project demonstrating best practices for building scalable applications with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/semmozhi-workshop-os.git
cd semmozhi-workshop-os
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
semmozhi-workshop-os/
├── public/                 # Static files
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/        # Reusable React components
│   ├── lib/              # Utility functions and helpers
│   ├── types/            # TypeScript type definitions
│   └── middleware.ts     # Next.js middleware (optional)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── LICENSE               # MIT License
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🎨 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CSS-in-JS**: CSS Modules & PostCSS
- **Linting**: [ESLint](https://eslint.org/)
- **Package Manager**: npm (or yarn/pnpm)

## ✨ Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ CSS Modules for component styles
- ✅ SWC for fast compilation
- ✅ React strict mode enabled
- ✅ Path aliases (@/*) for clean imports
- ✅ Environment configuration setup
- ✅ Comprehensive gitignore
- ✅ MIT License

## 📦 Dependencies

### Main Dependencies
- `react` - React library
- `react-dom` - React DOM library
- `next` - Next.js framework

### Development Dependencies
- `typescript` - TypeScript compiler
- `tailwindcss` - Utility-first CSS framework
- `postcss` - CSS transformation
- `autoprefixer` - PostCSS plugin for vendor prefixes
- `eslint` & `eslint-config-next` - Linting tools

## 🚀 Deployment

This project can be easily deployed to:

- [Vercel](https://vercel.com) - Recommended (created by Next.js team)
- AWS, Google Cloud, Azure
- Docker containers
- Self-hosted servers

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gowri Shankar.M**

## 📞 Support

For support, email support@semmozhi.dev or open an issue in the repository.

---

Made with ❤️ for the Semmozhi Workshop community
