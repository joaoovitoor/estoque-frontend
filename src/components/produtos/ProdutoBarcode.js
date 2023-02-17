import React from 'react';
import Barcode from 'react-barcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

export const ProdutoBarcode = (props) => {
  const { open, onClose, value } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Código de Barras</DialogTitle>
      <DialogContent>
        <Barcode value={value} />
      </DialogContent>
    </Dialog>
  );
}
