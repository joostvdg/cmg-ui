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
import SliderInput from '../components/InputSlider.js';
import Explanations from '../components/Explanations.js';

async function getMapByCode(code) {
    // console.log("getMapByCode: " + code) ;
    if (code === "") {
        return { code: "", error: "no game code input"};
    }
    let game        = {};
    const response = await fetch(
        `https://cmg-4rr4e6lcaq-ez.a.run.app/api/map/code/${code}`, 
        {
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
        }
    });

    const data = await response.json();
    // console.log(data)
    game.code = data.GameCode;
    if (data.Error) {
        game.error = data.Error;
    } else {
        game.error = "No error, all good."
    }
    processGameCode(game, game.code);
    return game;
}

async function fetchData(max, min, maxr, minr, max300, maxRow, maxColumn, adjacentSameInput) {
    let game         = {};
    let adjacentSame = "0";
    if (adjacentSameInput) {
        adjacentSame = "1"
    } 
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(`https://cmg-4rr4e6lcaq-ez.a.run.app/api/map/code?type=large&max=${max}&min=${min}&minr=${minr}&maxr=${maxr}&max300=${max300}&maxRow=${maxRow}&maxColumn=${maxColumn}&adjacentSame=${adjacentSame}`, {
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        }
    });

    const data = await response.json();
    // console.log(data)
    game.code = data.GameCode;
    game.type = "LARGE";
    if (data.Error) {
        game.error = data.Error;
    } else {
        game.error = "No error, all good."
    }
    processGameCode(game, game.code);
    return game;
}


export default function P6(props) {

    const defaultInputs = {
        maxInputRangeMin:         335,
        maxInputRangeMax:         390,
        maxInput:                 365,
        minInputRangeMin:         135,
        minInputRangeMax:         185,
        minInput:                 156,
        minResourceInputRangeMin: 50, 
        minResourceInputRangeMax: 75, 
        minResourceInput:         65,
        maxResourceInputRangeMin: 115, 
        maxResourceInputRangeMax: 155, 
        maxResourceInput:         140,
        maxOver300InputRangeMin:  16, 
        maxOver300InputRangeMax:  26, 
        maxOver300Input:          22,
        maxRowInputRangeMin:       1, 
        maxRowInputRangeMax:       5, 
        maxRowInput:               3,
        maxColumnInputRangeMin:    1, 
        maxColumnInputRangeMax:    5, 
        maxColumnInput:            3,
    }

    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    });

    const [gameCode, setGameCode] = useState( {gameCodeInput: ""} );
    const [inputs, setInputs] = useState(defaultInputs);
    const [checks, setChecks] = useState({
        adjacentSameInput: true
    });

    async function resetInput() {
        setInputs(defaultInputs);
        setChecks({
            adjacentSameInput: true
        });
    }

    async function getMapByCodeButton() {
        const refreshedProps = await getMapByCode(gameCode.gameCodeInput);
        setGame(refreshedProps);
    }

    async function clearGameCodeInput() {
        setGameCode({gameCodeInput: ""});
    }

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
        checks.adjacentSameInput
        );
        setGame(refreshedProps);
    }

    const handleOnChange = e => {
        if (e.target.id === "adjacentSameInputInput") {
            if (e.target.checked) {
                setChecks({adjacentSameInput: true});
            } else {
                setChecks({adjacentSameInput: false});
            }
        }

        e.persist()
        setGameCode(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
        setInputs(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));

        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null }
        })
    }

    return (
    <Layout>
        <div style={mapStyle} id="6pchart" >
            <div className="container">
                <h3 >6 Players Normal Game</h3>
                <p>Game Code: {game.code}</p>
                <p>Error: {game.error}</p>
                    <Explanations />

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-primary" type="button" onClick={getMapByCodeButton}>Generate Map by game code</button>
                            <button className="btn btn-outline-danger" type="button" onClick={clearGameCodeInput}><b>X</b></button>
                        </div>
                        <input id="gameCodeInput" onChange={handleOnChange} type="text" value={gameCode.gameCodeInput} className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <div className="btn-group mr-2" role="group" aria-label="Second group">
                            <button id="generateMap4Button" type="button" className="btn btn-outline-success" onClick={refresh}>Generate New Map</button>
                            <button className="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#advancedP6" aria-expanded="false" aria-controls="collapseExample">
                                Advanced Controls
                            </button>
                        </div>
                    </div>

                    <div className="collapse" id="advancedP6">
                        <div className="card card-body" style={sliderGroupStyle}>
                            <div className="input-group mb-3" >
                                < SliderInput explanationId="#explanationMax" title="Max" handleOnChange={handleOnChange} input={inputs.maxInput} inputMin={inputs.maxInputRangeMin} inputMax={inputs.maxInputRangeMax} id="maxInput"/>
                                < SliderInput explanationId="#explanationMin" title="Min" handleOnChange={handleOnChange} input={inputs.minInput} inputMin={inputs.minInputRangeMin} inputMax={inputs.minInputRangeMax} id="minInput"/>
                            </div>
                            <div className="input-group mb-3" >
                                < SliderInput explanationId="#explanationMaxR" title="MaxR" handleOnChange={handleOnChange} input={inputs.maxResourceInput} inputMin={inputs.maxResourceInputRangeMin} inputMax={inputs.maxResourceInputRangeMax} id="maxResourceInput"/>
                                < SliderInput explanationId="#explanationMinR" title="MinR" handleOnChange={handleOnChange} input={inputs.minResourceInput} inputMin={inputs.minResourceInputRangeMin} inputMax={inputs.minResourceInputRangeMax} id="minResourceInput"/>
                            </div>
                            <div className="input-group mb-3" >
                                < SliderInput explanationId="#explanationMaxRow"    title="MaxRow"      handleOnChange={handleOnChange} input={inputs.maxRowInput}      inputMin={inputs.maxRowInputRangeMin}       inputMax={inputs.maxRowInputRangeMax}       id="maxRowInput"/>
                                < SliderInput explanationId="#explanationMaxColumn" title="MaxColumn"   handleOnChange={handleOnChange} input={inputs.maxColumnInput}   inputMin={inputs.maxColumnInputRangeMin}    inputMax={inputs.maxColumnInputRangeMax}    id="maxColumnInput"/>
                            </div>
                            <div className="input-group mb-3" >
                                < SliderInput explanationId="#explanationMax300" title="Max300" handleOnChange={handleOnChange} input={inputs.maxOver300Input} inputMin={inputs.maxOver300InputRangeMin} inputMax={inputs.maxOver300InputRangeMax} id="maxOver300Input"/>
                                <div style={sliderBoxStyle}>
                                    <div className="input-group-prepend">
                                        <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationAdjacentSame">?</button>
                                        <h3><span style={sliderBoxStyle} className="input-group-text badge badge-light" id="basic-addon1">AdjacentSame: {inputs.adjacentSameInput}</span></h3>
                                    </div>
                                    <input style={sliderStyle} onChange={handleOnChange} style={sliderStyle} type="checkbox" className="range-field my-4 w-15" value={checks.adjacentSameInput} defaultChecked={checks.adjacentSameInput} id="adjacentSameInputInput" aria-label="adjacentSameInput" aria-describedby="adjacentSameInput-addon1"/>
                                </div>
                            </div>
                            <div className="input-group mb-3" style={sliderGroup}>
                                <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#explanationGeneral">General Explanation</button>
                                <button type="button" className="btn btn-outline-success btn-sm" onClick={resetInput}>Reset Input</button>
                            </div>
                        </div>
                    </div>
                </div>
                <svg className="chart" width="1250" height="1200">
                    

                <CanvasDefinitions />
                
                <g id="firstRow" className="tile">
                    <use id="s0" href="#tile" transform="translate(266.4, 100)" fill={game["s0"]} />
                    <use id="s1" href="#tile" transform="translate(439.6, 100)" fill={game["s1"]} />
                    <use id="s2" href="#tile" transform="translate(612.8, 100)" fill={game["s2"]} />
                </g>
                <g id="secondRow" className="tile">
                    <use id="s3" href="#tile" transform="translate(179.8, 250)" fill={game["s3"]} />
                    <use id="s4" href="#tile" transform="translate(353, 250)"   fill={game["s4"]} />
                    <use id="s5" href="#tile" transform="translate(526.2, 250)" fill={game["s5"]} />
                    <use id="s6" href="#tile" transform="translate(699.4, 250)" fill={game["s6"]} />
                </g>
                <g id="thirdRow" className="tile">
                    <use id="s7" href="#tile" transform="translate(93.2, 400)"   fill={game["s7"]} />
                    <use id="s8" href="#tile" transform="translate(266.4, 400)"   fill={game["s8"]} />
                    <use id="s9" href="#tile" transform="translate(439.6, 400)"   fill={game["s9"]} />
                    <use id="s10" href="#tile" transform="translate(612.8, 400)"  fill={game["s10"]} />
                    <use id="s11" href="#tile" transform="translate(786, 400)"    fill={game["s11"]} />
                </g>
                <g id="fourthRow" className="tile">
                    <use id="s12" href="#tile" transform="translate(6.6, 550)"   fill={game["s12"]} />
                    <use id="s13" href="#tile" transform="translate(179.8, 550)"  fill={game["s13"]} />
                    <use id="s14" href="#tile" transform="translate(353, 550)"    fill={game["s14"]} />
                    <use id="s15" href="#tile" transform="translate(526.2, 550)"  fill={game["s15"]} />
                    <use id="s16" href="#tile" transform="translate(699.4, 550)"  fill={game["s15"]} />
                    <use id="s17" href="#tile" transform="translate(872.6, 550)"  fill={game["s17"]} />
                </g>
                <g id="fithRow" className="tile">
                    <use id="s18" href="#tile" transform="translate(93.2, 700)"  fill={game["s18"]} />
                    <use id="s19" href="#tile" transform="translate(266.4, 700)"  fill={game["s19"]} />
                    <use id="s20" href="#tile" transform="translate(439.6, 700)"  fill={game["s20"]} />
                    <use id="s21" href="#tile" transform="translate(612.8, 700)"  fill={game["s21"]} />
                    <use id="s22" href="#tile" transform="translate(786, 700)"    fill={game["s22"]} />
                </g>
                <g id="sixtRow" className="tile">
                    <use id="s23" href="#tile" transform="translate(179.8, 850)" fill={game["s23"]} />
                    <use id="s24" href="#tile" transform="translate(353, 850)"   fill={game["s24"]} />
                    <use id="s25" href="#tile" transform="translate(526.2, 850)" fill={game["s25"]} />
                    <use id="s26" href="#tile" transform="translate(699.4, 850)" fill={game["s26"]} />
                </g>
                <g id="seventhRow" className="tile">
                    <use id="s27" href="#tile" transform="translate(266.4, 1000)" fill={game["s27"]} />
                    <use id="s28" href="#tile" transform="translate(439.6, 1000)" fill={game["s28"]} />
                    <use id="s29" href="#tile" transform="translate(612.8, 1000)" fill={game["s29"]} />
                </g>

                
                <g className="numslot" transform="translate(266.4, 100)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro" style={game["cstylesn0"]} />
                    <text id="sn0" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn0"]}>{game["sn0"]} </text>
                </g>
                <g className="numslot" transform="translate(439.6, 100)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro" style={game["cstylesn1"]}/>
                    <text id="sn1" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn1"]}>{game["sn1"]}</text>
                </g>
                <g className="numslot" transform="translate(612.8, 100)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro" style={game["cstylesn2"]}/>
                    <text id="sn2" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn2"]}>{game["sn2"]}</text>
                </g>


                <g className="numslot" transform="translate(179.8, 250)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn3"]} />
                    <text id="sn3" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn3"]}>{game["sn3"]}</text>
                </g>
                <g className="numslot" transform="translate(353, 250)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn4"]} />
                    <text id="sn4" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn4"]}>{game["sn4"]}</text>
                </g>
                <g className="numslot" transform="translate(526.2, 250)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn5"]} />
                    <text id="sn5" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn5"]}>{game["sn5"]}</text>
                </g>
                <g className="numslot" transform="translate(699.4, 250)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn6"]} />
                    <text id="sn6" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn6"]}>{game["sn6"]}</text>
                </g>


                <g className="numslot" transform="translate(93.2, 400)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn7"]} />
                    <text id="sn7" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn7"]}>{game["sn7"]}</text>
                </g>
                <g className="numslot" transform="translate(266.4, 400)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn8"]} />
                    <text id="sn8" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn8"]}>{game["sn8"]}</text>
                </g>
                <g className="numslot" transform="translate(439.6, 400)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn9"]} />
                    <text id="sn9" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn9"]}>{game["sn9"]}</text>
                </g>
                <g className="numslot" transform="translate(612.8, 400)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn10"]} />
                    <text id="sn10" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn10"]}>{game["sn10"]}</text>
                </g>
                <g className="numslot" transform="translate(786, 400)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn11"]} />
                    <text id="sn11" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn11"]}>{game["sn11"]}</text>
                </g>

                <g className="numslot" transform="translate(6.6, 550)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn12"]} />
                    <text id="sn12" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn12"]}>{game["sn12"]}</text>
                </g>
                <g className="numslot" transform="translate(179.8, 550)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn13"]} />
                    <text id="sn13" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn13"]}>{game["sn13"]}</text>
                </g>
                <g className="numslot" transform="translate(353, 550)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn14"]} />
                    <text id="sn14" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn14"]}>{game["sn14"]}</text>
                </g>
                <g className="numslot" transform="translate(526.2, 550)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn15"]} />
                    <text id="sn15" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn15"]}>{game["sn15"]}</text>
                </g>
                <g className="numslot" transform="translate(699.4, 550)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn16"]} />
                    <text id="sn16" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn16"]}>{game["sn16"]}</text>
                </g>
                <g className="numslot" transform="translate(872.6, 550)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn17"]} />
                    <text id="sn17" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn17"]}>{game["sn17"]}</text>
                </g>

                <g className="numslot" transform="translate(93.2, 700)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn18"]} />
                    <text id="sn18" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn18"]}>{game["sn18"]}</text>
                </g>
                <g className="numslot" transform="translate(266.4, 700)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn19"]} />
                    <text id="sn19" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn19"]}>{game["sn19"]}</text>
                </g>
                <g className="numslot" transform="translate(439.6, 700)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn20"]} />
                    <text id="sn20" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn20"]}>{game["sn20"]}</text>
                </g>
                <g className="numslot" transform="translate(612.8, 700)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn21"]} />
                    <text id="sn21" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn21"]}>{game["sn21"]}</text>
                </g>
                <g className="numslot" transform="translate(786, 700)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn22"]} />
                    <text id="lne4" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn22"]}>{game["sn22"]}</text>
                </g>

                <g className="numslot" transform="translate(179.8, 850)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn23"]} />
                    <text id="lnf0" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn23"]}>{game["sn23"]}</text>
                </g>
                <g className="numslot" transform="translate(353, 850)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn24"]} />
                    <text id="lnf1" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn24"]}>{game["sn24"]}</text>
                </g>
                <g className="numslot" transform="translate(526.2, 850)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn25"]} />
                    <text id="lnf2" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn25"]}>{game["sn25"]}</text>
                </g>
                <g className="numslot" transform="translate(699.4, 850)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro"  style={game["cstylesn26"]} />
                    <text id="sn26" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn26"]}>{game["sn26"]}</text>
                </g>

                <g className="numslot" transform="translate(266.4, 1000)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro" style={game["cstylesn27"]}  />
                    <text id="sn27" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn27"]}>{game["sn27"]}</text>
                </g>
                <g className="numslot" transform="translate(439.6, 1000)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro" style={game["cstylesn28"]}  />
                    <text id="sn28" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn28"]}>{game["sn28"]}</text>
                </g>
                <g className="numslot" transform="translate(612.8, 1000)">
                    <circle cx="260" cy="100" r="30" fill="Gainsboro" style={game["cstylesn29"]}  />
                    <text id="sn29" x="260" y="100" textAnchor=" middle" dy="0.3em" style={game["tstylesn29"]}>{game["sn29"]}</text>
                </g>                            
            </svg>
        </div>
    </Layout>
    );
}

P6.getInitialProps = fetchData;