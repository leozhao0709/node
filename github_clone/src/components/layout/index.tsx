import React from 'react';
import Nav from '../nav';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <React.Fragment>
      <Nav />
      {props.children}
    </React.Fragment>
  );
};

Layout.defaultProps = {};

export default Layout;
