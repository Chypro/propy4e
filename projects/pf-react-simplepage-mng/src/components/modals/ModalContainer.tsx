import React, { ReactNode } from 'react';

interface ModalContainerProps {
  children: ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ModalContainer;