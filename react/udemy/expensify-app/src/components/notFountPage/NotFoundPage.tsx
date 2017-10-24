import * as React from 'react';
import { Link } from 'react-router-dom';

interface INotFoundPageProps {
}

interface INotFoundPageState {
}

export default class NotFoundPage extends React.Component<INotFoundPageProps, INotFoundPageState> {

  static defaultProps: INotFoundPageProps = {
  };

  state: INotFoundPageState = {
  };

  render() {
    return (
      <div>
        404! - <Link to='/'>Go Home</Link>
      </div>
    );
  }
}
