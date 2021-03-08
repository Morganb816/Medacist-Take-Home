import React, { useState } from 'react';
import { Modal, Card, Box, Button } from '@material-ui/core';

const ModalButton = ({title, Component}) => {
    const [modalShowing, setModalShowing] = useState(false);

    const handleOpenModal = () => setModalShowing(true);
    const handleCloseModal = () => setModalShowing(false);

    return (
        <>
        <Button onClick={handleOpenModal}>{title}</Button>
        <Modal open={modalShowing} onClose={handleCloseModal}>
            <Card style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <Box p={2}>
                    <Component closeModal={handleCloseModal}/>
                </Box>
            </Card>
        </Modal>
        </>
    )
};

export default ModalButton;