import React from 'react';
import {
  Button,
  Modal,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clear } from '../store/error';

const ErrorModal = (props) => {
  const { handleSubmit, error } = props;
  return (
    <Modal open>
      <Modal.Header>An Error Has Occured</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <h3>{`Error:  ${error}`}
            <br />
            <br />
            Whoops! It looks like something went wrong, please try again later.
          </h3>
          <br />
          <br />
          <br />
          <Button onClick={() => handleSubmit()} size="massive" positive>I understand</Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

const mapState = null;
const mapDispatch = dispatch => ({
  handleSubmit() {
    dispatch(clear())
  },
})
export default connect(mapState, mapDispatch)(ErrorModal);
