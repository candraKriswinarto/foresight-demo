# Foresight Demo

A product catalog demo showcasing [ForesightJS](https://foresightjs.com/) — a library that predicts user intent from mouse movement, keyboard navigation, and scroll behavior to prefetch data before the user clicks.

Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## How it works

1. Products are fetched from [DummyJSON](https://dummyjson.com/) and displayed as a card grid.
2. Each card is registered with ForesightJS, which tracks cursor movement and predicts which card the user is heading toward.
3. When ForesightJS detects an intent, it prefetches the product detail ~200-400ms before the click.
4. On click, the detail panel slides in from the right — if prefetched, the content appears instantly; otherwise it fetches normally with a skeleton loader.
5. The simulated `?delay=800ms` on the API makes the prefetch timing clearly observable.

## Getting started

```bash
npm install
npm run dev
```
