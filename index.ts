export const ErrorKind = {
  UndefinedValue: "UndefinedValue",
} as const;
export type ErrorKind = typeof ErrorKind[keyof typeof ErrorKind]

export default class Mutable<T> {
  constructor(private _value: T | undefined) {}

  static new<T>(value: T) {
    return new Mutable(value);
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
    return Object.freeze(this._value);
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
