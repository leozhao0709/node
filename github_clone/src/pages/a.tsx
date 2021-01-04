import React from 'react';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';

interface AProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

const A: NextPage<AProps> = (props: AProps) => {
  return (
    <React.Fragment>
      <button>A {props.id}</button>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id as string;
  return {
    props: {
      id,
    },
  };
};

A.defaultProps = {};

export default A;
