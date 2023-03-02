import React from 'react';
import bwipjs from 'bwip-js';

class Barcode extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        const { value, width, height } = this.props;
        bwipjs.toCanvas(canvas, {
            bcid: 'code128', // Tipo de código de barras (Code 128 neste exemplo)
            text: value, // O valor do código de barras
            scale: 2, // O tamanho do código de barras (2 é um tamanho bom para começar)
            width: width, // A largura do código de barras em pixels
            height: height, // A altura do código de barras em pixels
        });
    }

    render() {
        const { width, height } = this.props;
        return <canvas ref={this.canvasRef} width={width} height={height} />;
    }
}

export default Barcode;
