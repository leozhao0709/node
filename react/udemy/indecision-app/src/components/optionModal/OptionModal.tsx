import * as React from 'react';
import * as Modal from 'react-modal';
import './_option-modal.scss';

interface IOptionModalProps {
  selectedOption?: string;
  handleCloseOptionModal: () => void;
}

interface IOptionModalState {
  selectedOption?: string;
}
export default class OptionModal extends React.Component<IOptionModalProps, IOptionModalState> {

  state: IOptionModalState = {
    selectedOption: this.props.selectedOption,
  };

  componentWillReceiveProps(nextProps: IOptionModalProps) {
    if (nextProps.selectedOption) {
      this.setState(() => {
        return {
          selectedOption: nextProps.selectedOption,
        };
      });
    }
  }

  render() {
    return (
      <Modal
        isOpen={!!this.props.selectedOption}
        contentLabel='selectedOption'
        onRequestClose={this.props.handleCloseOptionModal}
        closeTimeoutMS={200}
        className='modal'
      >
        <h3 className='modal__title'>Selected Option</h3>
        <p className='modal__body'>{this.state.selectedOption}</p>
        <button className='button' onClick={this.props.handleCloseOptionModal}>Okay</button>
      </Modal>
    );
  }
}
