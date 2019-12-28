import Layout from '../components/MyLayout.js';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import CanvasDefinitions from '../components/CatanPolygon.js';
import {
  mapStyle, 
  processGameCode,
  sliderStyle,
  sliderBoxStyle,
  sliderGroup,
  sliderGroupStyle
} from '../components/Catan.js';
import Explanations from '../components/Explanations.js';


async function fetchData(max, min, maxr, minr, max300, maxRow, maxColumn) {
  let game        = {};
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch(`https://catan-map-generator.herokuapp.com/api/map/code?type=normal&max=${max}&min=${min}&minr=${minr}&maxr=${maxr}&max300=${max300}&maxRow=${maxRow}&maxColumn=${maxColumn}`, {
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });

  const data = await response.json()
  console.log(data)
  game.code = data.GameCode;
    if (data.Error) {
        game.error = data.Error;
    } else {
        game.error = "No error, all good."
    }
  processGameCode(game, game.code)
  return game
}

export default function P4(props) {
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const defaultInputs = {
    maxInputRangeMin:         335,
    maxInputRangeMax:         390,
    maxInput:                 361,
    minInputRangeMin:         135,
    minInputRangeMax:         185,
    minInput:                 165,
    minResourceInputRangeMin: 25, 
    minResourceInputRangeMax: 40, 
    minResourceInput:         30,
    maxResourceInputRangeMin: 115, 
    maxResourceInputRangeMax: 155, 
    maxResourceInput:         130,
    maxOver300InputRangeMin:  8, 
    maxOver300InputRangeMax:  16, 
    maxOver300Input:          11,
    maxRowInputRangeMin:       1, 
    maxRowInputRangeMax:       4, 
    maxRowInput:               2,
    maxColumnInputRangeMin:    1, 
    maxColumnInputRangeMax:    4, 
    maxColumnInput:            2,
  }
  const [inputs, setInputs] = useState(defaultInputs);

  const [
    game,
    setGame,
  ] = useState(props);

  async function refresh() {
    const refreshedProps = await fetchData(
        inputs.maxInput, 
        inputs.minInput, 
        inputs.maxResourceInput,
        inputs.minResourceInput,
        inputs.maxOver300Input,
        inputs.maxRowInput,
        inputs.maxColumnInput
    );
    setGame(refreshedProps);
  }

    async function resetInput() {
        setInputs(defaultInputs);
    }

  const handleOnChange = e => {
    e.persist()
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    })
  }

  return (
    <Layout>
        <div style={mapStyle} id="4pchart" >
            <div className="container">
                <h3 >4 Players Normal Game</h3>
                <p>Game Code: {game.code}</p>
                <p>Error: {game.error}</p>

                <Explanations />

                <div className="btn-group" role="group" aria-label="Basic example">
                    <div className="btn-group mr-2" role="group" aria-label="Second group">
                        <button id="generateMap4Button" type="button" className="btn btn-outline-dark" onClick={refresh}>Generate New Map</button>
                        <button className="btn btn-outline-primary" type="button" data-toggle="collapse" data-target="#advancedP4" aria-expanded="false" aria-controls="collapseExample">
                            Advanced Controls
                        </button>
                    </div>
                </div>
                <div className="collapse" id="advancedP4">
                    <div className="card card-body" style={sliderGroupStyle}>
                        <div className="input-group mb-3" >
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationMax">?</button>
                                <h3><span style={sliderBoxStyle} className="input-group-text badge badge-light" id="basic-addon1">Max: {inputs.maxInput}</span></h3>
                            </div>
                            <input style={sliderStyle} onChange={handleOnChange} type="range" className="range-field my-4 w-15" min={inputs.maxInputRangeMin} max={inputs.maxInputRangeMax} value={inputs.maxInput} id="maxInput" aria-label="Max" aria-describedby="Max-addon1"/>
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationMin">?</button>
                                <h3><span style={sliderBoxStyle} className="input-group-text badge badge-light" id="basic-addon1">Min: {inputs.minInput}</span></h3>
                            </div>
                            <input  style={sliderStyle} onChange={handleOnChange} type="range" className="range-field my-4 w-15" min={inputs.minInputRangeMin} max={inputs.minInputRangeMax} value={inputs.minInput} id="minInput" aria-label="Min" aria-describedby="Min-addon1"/>
                        </div>
                        <div className="input-group mb-3" style={sliderGroup}>
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationMaxR">?</button>
                                <h3><span style={sliderBoxStyle} className="input-group-text badge badge-light" id="basic-addon1">MaxR: {inputs.maxResourceInput}</span></h3>
                            </div>
                            <input style={sliderStyle} onChange={handleOnChange} type="range" className="range-field my-4 w-15" min={inputs.maxResourceInputRangeMin} max={inputs.maxResourceInputRangeMax} value={inputs.maxResourceInput} id="maxResourceInput" aria-label="MaxR" aria-describedby="MaxR-addon1"/>
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationMinR">?</button>
                                <h3><span style={sliderBoxStyle} className="input-group-text badge badge-light" id="basic-addon1">MinR: {inputs.minResourceInput}</span></h3>
                            </div>
                            <input style={sliderStyle} onChange={handleOnChange} type="range" className="range-field my-4 w-15" min={inputs.minResourceInputRangeMin} max={inputs.minResourceInputRangeMax} value={inputs.minResourceInput} id="minResourceInput" aria-label="MinR" aria-describedby="MinR-addon1"/>                
                        </div>
                        <div className="input-group mb-3" style={sliderGroup}>
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationMaxRow">?</button>
                                <h3><span style={sliderBoxStyle} className="input-group-text badge badge-light" id="basic-addon1">MaxRow: {inputs.maxRowInput}</span></h3>
                            </div>
                            <input style={sliderStyle} onChange={handleOnChange} type="range" className="range-field my-4 w-15" min={inputs.maxRowInputRangeMin} max={inputs.maxRowInputRangeMax} value={inputs.maxRowInput} id="maxRowInput" aria-label="MaxRow" aria-describedby="MaxRow-addon1"/>
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationMaxColumn">?</button>
                                <h3><span style={sliderBoxStyle} className="input-group-text badge badge-light" id="basic-addon1">MaxColumn: {inputs.maxColumnInput}</span></h3>
                            </div>
                            <input style={sliderStyle} onChange={handleOnChange} type="range" className="range-field my-4 w-15" min={inputs.maxColumnInputRangeMin} max={inputs.maxColumnInputRangeMax} value={inputs.maxColumn} id="maxColumnInput" aria-label="maxColumn" aria-describedby="maxColumn-addon1"/>                
                        </div>
                        <div className="input-group mb-3" style={sliderGroup}>
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationMax300">?</button>
                                <h3><span style={sliderBoxStyle} className="input-group-text badge badge-light" id="basic-addon1">Max300: {inputs.maxOver300Input}</span></h3>
                            </div>
                            <input style={sliderStyle} onChange={handleOnChange} style={sliderStyle} type="range" className="range-field my-4 w-15" min={inputs.maxOver300InputRangeMin} max={inputs.maxOver300InputRangeMax} value={inputs.maxOver300Input} id="maxOver300Input" aria-label="MaxOver300" aria-describedby="max300-addon1"/>
                            <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationGeneral">General Explanation</button>
                            <button type="button" className="btn btn-outline-success btn-sm" onClick={resetInput}>Reset Input</button>
                        </div>
                    </div>
                </div>
            </div>
            <svg className="chart" width="1200px" height="900px">

                <CanvasDefinitions />

                <g id="firstRow" className="tile">
                    <use id="s0" href="#tile" transform="translate(196.4, 100)" fill={game["s0"]} />
                    <use id="s1" href="#tile" transform="translate(369.6, 100)" fill={game["s1"]} />
                    <use id="s2" href="#tile" transform="translate(542.8, 100)" fill={game["s2"]} />
                </g>

                <g id="secondRow" className="tile">
                    <use id="s3" href="#tile" transform="translate(109.8, 250)" fill={game["s3"]} />
                    <use id="s4" href="#tile" transform="translate(283, 250)"   fill={game["s4"]} />
                    <use id="s5" href="#tile" transform="translate(456.2, 250)" fill={game["s5"]} />
                    <use id="s6" href="#tile" transform="translate(629.4, 250)" fill={game["s6"]} />
                </g>

                <g id="thirdRow" className="tile">
                    <use id="s7" href="#tile" transform="translate(23.2, 400)"    fill={game["s7"]} />
                    <use id="s8" href="#tile" transform="translate(196.4, 400)"   fill={game["s8"]} />
                    <use id="s9" href="#tile" transform="translate(369.6, 400)"   fill={game["s9"]} />
                    <use id="s10" href="#tile" transform="translate(542.8, 400)"  fill={game["s10"]} />
                    <use id="s11" href="#tile" transform="translate(716, 400)"    fill={game["s11"]} />
                </g>

                <g id="fourthRow" className="tile">
                    <use id="s12" href="#tile" transform="translate(109.8, 550)" fill={game["s12"]} />
                    <use id="s13" href="#tile" transform="translate(283, 550)"   fill={game["s13"]} />
                    <use id="s14" href="#tile" transform="translate(456.2, 550)" fill={game["s14"]} />
                    <use id="s15" href="#tile" transform="translate(629.4, 550)" fill={game["s15"]} />
                </g>

                <g id="fifthRow" className="tile">
                    <use id="s16" href="#tile" transform="translate(196.4, 700)" fill={game["s16"]} />
                    <use id="s17" href="#tile" transform="translate(369.6, 700)" fill={game["s17"]} />
                    <use id="s18" href="#tile" transform="translate(542.8, 700)" fill={game["s18"]} />
                </g>

                <g className="numslot" transform="translate(196.4, 100)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn0"]}  />
                    <text id="sn0" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn0"]}>{game["sn0"]} </text>
                </g>
                <g className="numslot" transform="translate(369.6, 100)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn1"]}  />
                    <text id="sn1" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn1"]}>{game["sn1"]}</text>
                </g>
                <g className="numslot" transform="translate(542.8, 100)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn2"]}  />
                    <text id="sn2" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn2"]}>{game["sn2"]}</text>
                </g>



                <g className="numslot" transform="translate(109.8, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn3"]}  />
                    <text id="sn3" x="260" y="100" textAnchor="middle" dy="0.3em"style={game["tstylesn3"]}>{game["sn3"]}</text>
                </g>
                <g className="numslot" transform="translate(283, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn4"]}  />
                    <text id="sn4" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn4"]}>{game["sn4"]}</text>
                </g>
                <g className="numslot" transform="translate(456.2, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn5"]}  />
                    <text id="sn5" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn5"]}>{game["sn5"]}</text>
                </g>
                <g className="numslot" transform="translate(629.4, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn6"]}  />
                    <text id="sn6" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn6"]}>{game["sn6"]}</text>
                </g>


                <g className="numslot" transform="translate(23.2, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn7"]}  />
                    <text id="sn7" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn7"]}>{game["sn7"]}</text>
                </g>
                <g className="numslot" transform="translate(196.4, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn8"]}  />
                    <text id="sn8" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn8"]}>{game["sn8"]}</text>
                </g>
                <g className="numslot" transform="translate(369.6, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn9"]}  />
                    <text id="sn9" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn9"]}>{game["sn9"]}</text>
                </g>
                <g className="numslot" transform="translate(542.8, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn10"]}  />
                    <text id="sn10" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn10"]}>{game["sn10"]}</text>
                </g>
                <g className="numslot" transform="translate(716, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn11"]}  />
                    <text id="sn11" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn11"]}>{game["sn11"]}</text>
                </g>
                
                <g className="numslot" transform="translate(109.8, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn12"]}  />
                    <text id="sn12" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn12"]}>{game["sn12"]}</text>
                </g>
                <g className="numslot" transform="translate(283, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn13"]}  />
                    <text id="sn13" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn13"]}>{game["sn13"]}</text>
                </g>
                <g className="numslot" transform="translate(456.2, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn14"]}  />
                    <text id="sn14" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn14"]}>{game["sn14"]}</text>
                </g>
                <g className="numslot" transform="translate(629.4, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn15"]}  />
                    <text id="sn15" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn15"]}>{game["sn15"]}</text>
                </g>


                <g className="numslot" transform="translate(196.4, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn16"]}  />
                    <text id="sn16" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn16"]}>{game["sn16"]}</text>
                </g>
                <g className="numslot" transform="translate(369.6, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn17"]}  />
                    <text id="sn17" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn17"]}>{game["sn17"]}</text>
                </g>
                <g className="numslot" transform="translate(542.8, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn18"]}  />
                    <text id="sn18" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn18"]}>{game["sn18"]}</text>
                </g>
            </svg>
        </div>
    </Layout>
    );
}

P4.getInitialProps = fetchData;