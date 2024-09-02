interface User {
  id: string
  email: string
  name: string
  lastName: string
  role: string
}

export class UserDTO {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public lastName: string,
    public role: string,
  ) {}

  static create(object: User): UserDTO {
    const { id, email, name, lastName, role } = object

    return new UserDTO(id, email, name, lastName, role)
  }
}
