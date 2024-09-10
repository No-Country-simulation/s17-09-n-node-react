import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export const Modal = ({children}: {children: ReactNode}) => {
  return createPortal(
    <div className="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>,
    document.getElementById("modal")!
  );
}
