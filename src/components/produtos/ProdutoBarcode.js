import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Barcode from 'react-barcode';

export const ProdutoBarcode = (props) => {
    const { open, onClose, value } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Código de Barras</DialogTitle>
            <DialogContent>
                <Barcode value={value} format={'CODE128'} />
            </DialogContent>
        </Dialog>
    );
};
