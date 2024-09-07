interface User {
  email: string
  name: string
  lastName: string
  role: string
  imageUrl: string
}

export class UserDTO {
  constructor(
    public email: string,
    public name: string,
    public lastName: string,
    public role: string,
    public imageUrl: string,
  ) {}

  static create(object: User): UserDTO {
    const { email, name, lastName, role, imageUrl } = object

    return new UserDTO(email, name, lastName, role, imageUrl)
  }
}
