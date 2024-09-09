import { useContext } from 'react';
import { SessionContext } from '../contexts/session/SessionContext'; // Ajusta la ruta según tu estructura

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
