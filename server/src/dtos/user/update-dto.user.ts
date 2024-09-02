export class UpdateUserDTO {
  constructor(
    public name?: string,
    public lastName?: string,
  ) {}

  static create(object: { [key: string]: string }): UpdateUserDTO {
    const { name, lastName } = object
    return new UpdateUserDTO(name, lastName)
  }
}
