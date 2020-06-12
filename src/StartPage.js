import React from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import './App.css';
import {getCellX, getCellY, initCells} from './util/utilFunctions'
import Field from "./shapes/Field";
import RangeSlider from 'react-bootstrap-range-slider';

const FIELD_COLOR = "#FFCAC2";
const ALIVE_COLOR = "#900C3F";

export default class StartPage extends React.Component {
    constructor(props) {
        super(props);
        // tmp
        this.offset = 1;
        this.state = {
            xCount: props.xCount,
            yCount: props.yCount,
            cellSize: 5,
            canvasWidth: 652,
            canvasHeight: 652,
            epochDuration: 500,
            field: new Field(initCells(props.xCount, props.yCount, 5, this.offset)),
            epoch: 0,
            drawMode: false
        };

        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.drawCanvas();
    }

    start = () => {
        this.pause();
        this.timerId = setInterval(() => this.drawCanvas(), this.state.epochDuration);
    };

    pause = () => {
        clearInterval(this.timerId);
    };

    drawField = () => {
        const ctx = this.canvas.current.getContext('2d');
        const field = this.state.field;
        ctx.beginPath();
        for (let x = 0; x < this.state.xCount; ++x) {
            for (let y = 0; y < this.state.yCount; ++y) {
                ctx.rect(field.cells[x][y].x, field.cells[x][y].y, this.state.cellSize, this.state.cellSize);
            }
        }
        ctx.fillStyle = FIELD_COLOR;
        ctx.fill();
        ctx.closePath();
    };

    drawAliveCells = () => {
        const ctx = this.canvas.current.getContext('2d');
        const field = this.state.field;

        ctx.beginPath();
        for (let x = 0; x < this.state.xCount; ++x) {
            for (let y = 0; y < this.state.yCount; ++y) {
                if (field.cells[x][y].isAlive) {
                    ctx.rect(field.cells[x][y].x, field.cells[x][y].y, this.state.cellSize, this.state.cellSize);
                }
            }
        }
        ctx.fillStyle = ALIVE_COLOR;
        ctx.fill();
        ctx.closePath();
    };

        updateCanvas = () => {
        this.drawField();
        this.drawAliveCells();
    };

    drawCanvas = () => {
        const ctx = this.canvas.current.getContext('2d');

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.state.field.updateCells();
        this.updateCanvas();
        this.setState({epoch: this.state.epoch + 1});
    };

    onCanvasClick = (event) => {
        this.state.field.changeCellStatus(getCellX(event, this.state.cellSize, this.offset),
            getCellY(event, this.state.cellSize, this.offset));
        this.updateCanvas();
    };

    onFlush = () => {
        this.state.field.flush();
        this.drawField();
        this.pause();
        this.setState({epoch: 0});
    };

    setDrawMode = (event) => {
        this.setState({
            drawMode: !this.state.drawMode
        });
        event.preventDefault();
    };

    onMouseMove = (event) => {
        this.state.field._changeCellStatus(getCellX(event, this.state.cellSize, this.offset),
            getCellY(event, this.state.cellSize, this.offset), true);
        this.updateCanvas();
    };

    changeEpochDuration = (event) => {
        this.setState({
            epochDuration: +event.target.value
        }, () => this.start());
    };

    render() {
        return (
            <div className="container" onContextMenu={this.setDrawMode}>
                <canvas
                    ref={this.canvas}
                    width={this.state.canvasWidth}
                    height={this.state.canvasHeight}
                    onClick={this.onCanvasClick}
                    onMouseMove={this.state.drawMode ? this.onMouseMove : null}
                />
                <span>{`Epoch #${this.state.epoch}`}</span>
                <div className="buttons">
                    <Button className="button" onClick={this.start} variant="outline-success">Start</Button>
                    <Button className="button" onClick={this.pause} variant="outline-warning">Pause</Button>
                    <Button className="button" onClick={this.onFlush} variant="outline-danger">Flush</Button>
                </div>
                <div className="controls">

                    <Form.Group as={Row} style={{width: '50%'}}>
                        <Form.Label column sm="3">
                            Epoch duration
                        </Form.Label>
                        <Col sm="6">
                            <RangeSlider
                                step={100}
                                min={0}
                                max={1000}
                                value={this.state.epochDuration}
                                onChange={this.changeEpochDuration}
                            />
                        </Col>
                        <Col sm="3">
                            <Form.Check
                                type="checkbox"
                                label="Draw mode"
                                checked={this.state.drawMode}
                                onChange={() => this.setState({
                                    drawMode: !this.state.drawMode
                                })}
                            />
                        </Col>
                    </Form.Group>
                </div>
            </div>
        );
    }
}
