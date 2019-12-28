import {
    sliderStyle,
    sliderBoxStyle,
  } from './Catan.js';


export default function SliderInput(props) {
    return (
    <div style={sliderBoxStyle}>
        <div className="input-group-prepend">
            <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target={props.explanationId}>?</button>
            <h3><span style={sliderBoxStyle} className="input-group-text badge badge-light" id="basic-addon1">{props.title}: {props.input}</span></h3>
        </div>
        <input style={sliderStyle} onChange={props.handleOnChange} type="range" className="range-field my-4 w-15" min={props.inputMin} max={props.inputMax} value={props.input} id={props.id}/>
    </div>
    );
}

