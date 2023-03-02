import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Barcode from '../barcode';

export const ProdutoBarcode = (props) => {
    const { open, onClose, value } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Código de Barras</DialogTitle>
            <DialogContent>
                <Barcode value={value} width={100} height={50} />
                <DialogContentText>{value}</DialogContentText>
            </DialogContent>
        </Dialog>
    );
};
