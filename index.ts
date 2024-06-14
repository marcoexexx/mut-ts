export const ErrorKind = {
  UndefinedValue: "UndefinedValue",
} as const;
export type ErrorKind = typeof ErrorKind[keyof typeof ErrorKind];

export default class Mutable<T extends object> {
  constructor(private _value: T | undefined) {}

  static new<T extends object>(value: T) {
    return new Mutable(value);
  }

  static deepFreeze<T extends object>(obj: T) {
    const props = Object.getOwnPropertyNames(obj);

    for (const prop of props) {
      const value = obj[prop as keyof typeof obj];
      if (value && typeof value === "object") Mutable.deepFreeze(value);
    }

    return Object.freeze(obj);
  }

  borrow_mut(): T {
    if (this._value === undefined) {
      throw new Error(`${ErrorKind.UndefinedValue}: moved value: `);
    }
    return this._value;
  }

  borrow(): T {
    if (this._value === undefined) {
      throw new Error(`${ErrorKind.UndefinedValue}: moved value: `);
    }
    return Mutable.deepFreeze(this._value);
  }

  clone(): Mutable<T> {
    if (this._value === undefined) {
      throw new Error(`${ErrorKind.UndefinedValue}: moved value: `);
    }
    return Mutable.new(JSON.parse(JSON.stringify(this._value)));
  }

  move(): Mutable<T> {
    if (this._value === undefined) {
      throw new Error(`${ErrorKind.UndefinedValue}: moved value: `);
    }

    let new_instance = Mutable.new(this._value);
    this._value = undefined;

    return new_instance;
  }
}
