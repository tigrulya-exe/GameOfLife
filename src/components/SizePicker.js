import React from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import './App.css';


export default class SizePicker extends React.Component {
    // yeah, hardcode!
    canvasSizes = {
        "S": {
            offset: 2,
            xCount: 40,
            yCount: 40,
            cellSize: 10,
            canvasWidth: 482,
            canvasHeight: 482
        },
        "M": {
            offset: 2,
            xCount: 60,
            yCount: 60,
            cellSize: 8,
            canvasWidth: 602,
            canvasHeight: 602
        },
        "L": {
            offset: 1,
            xCount: 108,
            yCount: 108,
            cellSize: 5,
            canvasWidth: 652,
            canvasHeight: 652
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            offset: 2,
            xCount: props.xCount,
            yCount: props.yCount,
            cellSize: 5,
            canvasWidth: 652,
            canvasHeight: 652,
        };

    }

    onSelect = (eventKey) => {
        this.props.onSizeSelect(this.canvasSizes[eventKey]);
    };

    render() {
        return (
            <DropdownButton onSelect={this.onSelect} id="dropdown-basic-button" title="Field size">
                <Dropdown.Item eventKey="S">S</Dropdown.Item>
                <Dropdown.Item eventKey="M">M</Dropdown.Item>
                <Dropdown.Item eventKey="L">L</Dropdown.Item>
            </DropdownButton>
        );
    }
}
