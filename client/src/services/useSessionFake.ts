export const useSessionFake = () => {
    // Simulamos los datos de la sesión en lugar de hacer una petición a la API
    const session = {
      user: {
        id: '123',
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        profilePic: "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
      }
    }
    const loading = false // Simulamos que ya cargó la sesión
  
    return { session, loading }
  }
  