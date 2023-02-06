import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import { Navbar } from '../ui';

type Props = {
  title: string;
  description: string;
  img?: string;
  keywords?: string[];
};

export const MainLayout: FC<PropsWithChildren<Props>> = ({
  description,
  title,
  children,
  img,
  keywords,
}) => {
  return <>
    <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords?.join(',')} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={description} />
        <meta name='og:image' content={img}/>
    </Head>
    <header>
        <Navbar />
    </header>
    <main>
        {children}
    </main>
    <footer>
        {/* TODO: create a footer */}
    </footer>
   
  </>;
};
