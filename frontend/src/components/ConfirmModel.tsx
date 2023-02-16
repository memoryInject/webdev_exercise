import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  confirm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmModel = ({ message, confirm, show, setShow }: Props) => {
  const handleClose = () => setShow(false);
  const handleConfrim = () => {
    confirm(true);
    setShow(false);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Work-Genius</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfrim}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModel;
