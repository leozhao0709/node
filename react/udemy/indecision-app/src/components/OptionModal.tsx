import * as React from 'react';
import * as Modal from 'react-modal';

interface IOptionModalProps {
  selectedOption?: string;
  handleCloseOptionModal: () => void;
}

interface IOptionModalState {
}
export default class OptionModal extends React.Component<IOptionModalProps, IOptionModalState> {

  state: IOptionModalState = {
  };

  render() {
    return (
      <Modal
        isOpen={!!this.props.selectedOption}
        contentLabel='selectedOption'
        onRequestClose={this.props.handleCloseOptionModal}
      >
        <h3>Selected Option</h3>
        {this.props.selectedOption && <p>{this.props.selectedOption}</p>}
        <button onClick={this.props.handleCloseOptionModal}>Okay</button>
      </Modal>
    );
  }
}
