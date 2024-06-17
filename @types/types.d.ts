interface SymbolConstructor {
  readonly dispose: unique symbol;
}

interface Disposable {
  [Symbol.dispose](): void;
}

// @ts-ignore - if it already exists as a readonly property, this is a no-op anyway
Symbol.dispose ??= Symbol("Symbol.dispose");
