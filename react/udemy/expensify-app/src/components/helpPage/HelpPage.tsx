import * as React from 'react';

interface IHelpPageProps {
}

interface IHelpPageState {
}

export default class HelpPage extends React.Component<IHelpPageProps, IHelpPageState> {

  static defaultProps: IHelpPageProps = {
  };

  state: IHelpPageState = {
  };

  render() {
    return (
      <div>
        This is from help page
      </div>
    );
  }
}
