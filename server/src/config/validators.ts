export class Validators {
  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  }

  static get names() {
    return /^[a-zA-Z]+$/
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static enums(value: any, enumObj: any): boolean {
    return Object.values(enumObj).includes(value)
  }
}