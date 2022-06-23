import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddModal({ open, handleCloseModal, handleSubmit, member, setMember }) {
    return (
        <Dialog open={open} onClose={handleCloseModal}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Member</DialogTitle>
                <DialogContent>
                    <FormControl variant="standard" sx={{ mt: 3, width: '100%' }}>
                        <InputLabel id="member-parent">Parent</InputLabel>
                        <Select
                            labelId="member-parent"
                            id="member-parent-select"
                            value={member?.parent?.id || 0}
                            label="parent"
                            disabled={true}
                        // onChange={() => {}}
                        >
                            <MenuItem value={member?.parent?.id || 0}>{member?.parent?.fullname || ' - '}</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fullname"
                        label="Fullname"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={member.fullname || ''}
                        onChange={e => setMember({ ...member, fullname: e.target.value })}
                        required
                        min={2}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack sx={{ mt: 3 }}>
                            <DateTimePicker
                                label="Birth Date"
                                inputFormat="MM/dd/yyyy"
                                value={member.birth || ''}
                                onChange={value => setMember({ ...member, birth: value })}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}