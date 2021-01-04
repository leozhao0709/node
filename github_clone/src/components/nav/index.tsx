import React from 'react';
import Link from 'next/link';

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

const Nav: React.FC<NavProps> = (props: NavProps) => {
  return (
    <nav>
      <Link href="/" as="/">
        <a>Home</a>
      </Link>
      <Link href="/a?id=1" as="/a/1">
        <a>A</a>
      </Link>
    </nav>
  );
};

Nav.defaultProps = {};

export default Nav;
