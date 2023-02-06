'use client';
import React from 'react';
import Link from 'next/link';
import {
  MdFavorite,
  MdPerson,
  MdShoppingBasket,
  MdShoppingCart,
} from 'react-icons/md';
import { IconButton } from '../buttons';
import { Badge } from '../badges';
import { Popover } from '@headlessui/react';
import { PopoverMenu } from '../popovers';

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <nav className="flex min-h-[4rem] flex-wrap items-center justify-between border px-5 py-2">
      <div className="flex flex-1 items-center justify-start">
        <Link
          href="/"
          className="text-lg font-bold uppercase tracking-wide"
        >
          Shop
        </Link>
      </div>
      <div>
        <div className="flex min-w-[30rem] overflow-hidden rounded-2xl">
          <input
            type="search"
            className="flex-1 bg-gray-100 p-5 py-2 outline-none"
          />
          <button className="bg-red-500 px-5 font-semibold text-white">
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-1">
        <PopoverMenu
          Button={IconButton}
          buttonContent={<MdPerson />}
          content={<p>Content</p>}
        />
        <Badge content="4">
          <IconButton onClick={() => console.log('clicked')}>
            <MdShoppingBasket />
          </IconButton>
        </Badge>
        <Badge content="5">
          <IconButton onClick={() => console.log('clicked')}>
            <MdShoppingCart />
          </IconButton>
        </Badge>
      </div>
      <div className="flex min-h-[2rem] w-full justify-center gap-5">
        <Link
          href="/"
          className="flex items-center"
        >
          Abarrotes
        </Link>
        <Link
          href="/"
          className="flex items-center"
        >
          Abarrotes
        </Link>
        <Link
          href="/"
          className="flex items-center"
        >
          <MdFavorite className="text-red-500" />
          <span>About us</span>
        </Link>
        <Link
          href="/"
          className="flex items-center"
        >
          Join us
        </Link>
      </div>
    </nav>
  );
};
