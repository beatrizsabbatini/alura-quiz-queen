import React, { ReactNode } from 'react';
import NextLink from 'next/link';

interface LinkProps{
  children: ReactNode
  href: string
}

export default function Link({ children, href, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a {...props}>
        {children}
      </a>
    </NextLink>
  );
}
