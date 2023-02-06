import { Popover, Transition } from '@headlessui/react';
import React, { ElementType, FC, Fragment } from 'react';
import { IconButton } from '../buttons';

type Props = {
  Button: ElementType;
  content: JSX.Element;
  buttonContent: String | JSX.Element;
};

export const PopoverMenu: FC<Props> = ({ Button, buttonContent, content }) => {
  return (
    <Popover className="relative">
      <Popover.Button as={Button}>{buttonContent}</Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute top-[110%] right-0 w-screen max-w-xs">
          <div
            className="overflow-hidden rounded-lg bg-white 
          p-5 shadow-lg ring-1 ring-black ring-opacity-5"
          >
            {content}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
