import { Modal, Box, Typography } from '@mui/material'; // Importar los componentes necesarios de MUI
import '../components/CSS/Modal.css';

const ModalWrapper = ({ isOpen, title, children, onClose, actions }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
      }}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
        <div className="modal-actions">
          {actions}
        </div>
      </Box>
    </Modal>
  );
};

export default ModalWrapper;