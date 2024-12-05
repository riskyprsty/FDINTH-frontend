---
runme:
  document:
    relativePath: README.md
  session:
    id: 01JEB7CX9N0S3M6BYMSPM4CXAC
    updated: 2024-12-05 20:58:55+07:00
---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](ht*********************************************************************************md) uses [Babel](ht**************io/) for Fast Refresh
- [@vitejs/plugin-react-swc](ht*******************************************wc) uses [SWC](ht**********rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](ht*********************************************ct) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
