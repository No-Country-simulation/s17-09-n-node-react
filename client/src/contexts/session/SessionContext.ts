import React from 'react';
import { ISession, ISessionUser } from '../../interfaces';

interface ISessionContext extends ISession {
  createSession: (user: ISessionUser) => void;
  deleteSession: () => void;
  loadingSession: () => void;
}

export const SessionContext = React.createContext<ISessionContext | undefined>(undefined);
