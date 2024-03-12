import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ActiveCofirmationDialog({ isOpen, onCancel, onConfirm, message }) {
    return (
        <Modal show={isOpen} centered>
            <Modal.Header>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ActiveCofirmationDialog;
