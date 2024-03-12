import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationDialog({ show, onClose, onConfirm, name }) {
    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: '14px' }}>
                Are you sure, you want to delete: {name}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationDialog;
