export default class UserService {
  static async getUsers(): Promise<string[]> {
    return ['Maria', 'Louis', 'Jacob']
  }
}
