import * as React from 'react';
import AddOption from './addOption/AddOption';
import Options from './options/Options';
import Action from './action/Action';
import Header from './header/Header';
import OptionModal from './optionModal/OptionModal';

interface IIndecisionAppProps {
  title?: string;
  subtitle?: string;
  options?: string[];
}

interface IIndecisionAppState {
  options: string[];
  selectedOption?: string;
}

export default class IndecisionApp extends React.Component<IIndecisionAppProps, IIndecisionAppState> {

  static defaultProps: IIndecisionAppProps = {
    title: 'Indescision',
    subtitle: 'Put your life in the hands of a computer',
    options: [],
  };

  state: IIndecisionAppState = {
    options: this.props.options!,
    selectedOption: undefined
  };

  constructor(props: IIndecisionAppProps) {
    super(props);
    this.state = {
      options: this.props.options!,
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = json ? JSON.parse(json) : [];
      this.setState((): IIndecisionAppState => {
        return {
          options: options,
        };
      });
    } catch (error) {

    }
  }

  componentDidUpdate(prevProp: IIndecisionAppProps, prevState: IIndecisionAppState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {
    console.log(`handleDeleteOption: (option: string)=>void;`);
  }

  onRemoveAll = () => {
    this.setState(() => {
      return {
        options: [],
      };
    });
  }

  handleDeleteOption = (optionToRemove: string) => {
    this.setState((prevState: IIndecisionAppState) => {
      return {
        options: prevState.options.filter((option: string) => {
          return option !== optionToRemove;
        })
      };
    });
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState((prevState: IIndecisionAppState) => {
      return {
        selectedOption: option
      };
    });
  }

  handleAddOption = (option: string): string | void => {
    if (!option) {
      return 'Enter valid value to add item';
    }

    if (this.state.options.indexOf(option) !== -1) {
      return 'This option already exists';
    }

    this.setState((prevState: IIndecisionAppState): IIndecisionAppState => {
      return {
        options: prevState.options.concat([option])
      };
    });
  }

  handleCloseOptionModal = () => {
    this.setState(() => {
      return {
        selectedOption: null
      };
    });
  }

  render() {

    return (
      <div>
        <Header title={this.props.title!} subtitle={this.props.subtitle!}></Header>
        <div className='container'>
          <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}></Action>
          <div className='widget'>
            <Options
              options={this.state.options}
              onRemoveAll={this.onRemoveAll}
              handleDeleteOption={this.handleDeleteOption}
            ></Options>
            <AddOption handleAddOption={this.handleAddOption}></AddOption>
          </div>
        </div>
        <OptionModal selectedOption={this.state.selectedOption} handleCloseOptionModal={this.handleCloseOptionModal}></OptionModal>
      </div>
    );
  }
}
