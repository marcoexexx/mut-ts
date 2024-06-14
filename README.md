# Mutable TypeScript Library

A TypeScript library for creating and managing mutable objects, inspired by Rust's ownership and borrowing principles.

## Installation

You can install the package via npm:

```bash
npm install mut-ts
```

## Usage

This library provides a `Mutable` class that helps manage mutable objects with methods for borrowing, cloning, and moving values.

### Example

```typescript
import { Mutable, ErrorKind } from 'mut-ts';

const x = Mutable.new([1, 2, 3]);
const y = x.clone();  // Clone `x` instead of just assigning it
y.borrow_mut().push(2);

console.log(x.borrow());  // Output: [1, 2, 3]
console.log(y.borrow());  // Output: [1, 2, 3, 2]
```

### API

#### `Mutable`

A class that manages mutable objects.

- **new\<T\>(value: T): Mutable\<T\>**

  Static method to create a new `Mutable` instance.

- **borrow_mut(): T**

  Returns a mutable reference to the value. Throws an error if the value is `undefined`.

- **borrow(): T**

  Returns a read-only reference to the value. Throws an error if the value is `undefined`.

- **clone(): Mutable\<T\>**

  Returns a deep clone of the `Mutable` instance. Throws an error if the value is `undefined`.

- **move(): Mutable\<T\>**

  Moves the value to a new `Mutable` instance, setting the original instance's value to `undefined`. Throws an error if the value is `undefined`.

### ErrorKind

An object containing error kinds used within the `Mutable` class.

- **UndefinedValue**

  Error message for accessing a moved value.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
