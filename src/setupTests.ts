import "@testing-library/jest-dom";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

console.info("Vitest setup file loaded successfully.");
