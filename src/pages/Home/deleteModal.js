import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteModal({ open, handleCloseModal, handleDelete, member }) {
    return (
        <div>
            <Dialog open={open} onClose={handleCloseModal}>
                <DialogTitle>Delete {member.fullname}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}