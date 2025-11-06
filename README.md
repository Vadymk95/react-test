# React Technical Assessment

This repository is designed for technical interviews and coding assessments. It provides a pre-configured React + TypeScript + Vite environment for candidates to complete coding challenges.

## 🚀 Quick Start

### Prerequisites

-   Node.js (v14.18+ or v16+)
-   npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-test

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at **http://localhost:3000/**

## 📋 Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start development server on port 3000 |
| `npm run build`   | Build for production                  |
| `npm run preview` | Preview production build locally      |

## 🛠 Tech Stack

-   **React 18** - Modern React with Hooks
-   **TypeScript** - Type safety and enhanced developer experience
-   **Vite** - Fast build tool and dev server
-   **SWC** - Rust-based JavaScript/TypeScript compiler (faster than Babel)

## 📁 Project Structure

```
react-test/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # Vite type definitions
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## 📝 Assessment Guidelines

### What's Already Included

This project comes with a sample implementation demonstrating:

-   ✅ API data fetching
-   ✅ State management with React Hooks
-   ✅ Component memoization
-   ✅ TypeScript interfaces and types
-   ✅ Search and sorting functionality

### Your Task

**Feel free to modify any existing code or create new components based on your assignment requirements.**

The current implementation is just a reference - you can:

-   Replace the existing code entirely
-   Build upon the existing structure
-   Add new features and functionality
-   Refactor and improve the code quality

### What We're Looking For

-   ✨ **Clean Code** - Readable, maintainable, and well-structured
-   🎯 **Best Practices** - Modern React patterns and conventions
-   📦 **Component Design** - Reusable and composable components
-   🔒 **Type Safety** - Proper TypeScript usage
-   🎨 **UI/UX** - Attention to user experience
-   ⚡ **Performance** - Optimization and efficient rendering

## 💡 Development Tips

### Hot Module Replacement (HMR)

Changes to your code will automatically refresh in the browser without losing state.

### TypeScript Support

Full TypeScript support is configured. Type errors will show in:

-   Your IDE/editor
-   Terminal during development
-   Build process

### Debugging

-   React DevTools extension recommended
-   Console logs work as expected
-   Source maps enabled for debugging

## 🔧 Configuration

### Port Configuration

The dev server runs on port **3000** by default. You can change this in `vite.config.ts`:

```typescript
server: {
  port: 3000,
}
```

### TypeScript Configuration

TypeScript is configured with strict mode enabled. Adjust settings in `tsconfig.json` if needed.

## 📚 Useful Resources

-   [React Documentation](https://react.dev/)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs/)
-   [Vite Documentation](https://vitejs.dev/)

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use, either:

-   Stop the process using that port
-   Change the port in `vite.config.ts`

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Ensure you're using TypeScript 4.9+ and all dependencies are properly installed.

## 📞 Questions?

If you encounter any issues setting up the project or have questions about the assessment, please reach out to your interviewer.

---

**Good luck with your assessment!** 🎉

_This project uses modern React best practices and is designed to help you showcase your frontend development skills._
