import React from 'react';
import Link from 'next/link';

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

const Nav: React.FC<NavProps> = (props: NavProps) => {
  return (
    <nav>
      <Link href="/" as="/">
        <a>Home</a>
      </Link>
      <Link href="/about" as="/about">
        <a>About</a>
      </Link>
    </nav>
  );
};

Nav.defaultProps = {};

export default Nav;
