import * as React from 'react';
import './header.scss';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default class Header extends React.Component<HeaderProps, {}> {
  render() {
    return (
      <div className='header'>
        <div className='container'>
          <h1 className='header__title'>{this.props.title}</h1>
          <h2 className='header__subtitle'>{this.props.subtitle}</h2>
        </div>
      </div>
    );
  }
}
