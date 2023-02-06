import React, { FC, PropsWithChildren } from 'react';

type Props = {
  onClick?: () => void;
};

export const IconButton: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full 
      bg-gray-100 transition-colors duration-500 ease-in-out hover:bg-gray-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
