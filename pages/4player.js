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

async function getMapByCode(code) {
    // console.log("getMapByCode: " + code) ;
    if (code === "") {
        return { 
            code: "", error: "no game code input",
            type: "SEAFARERS_NORMAL"
        };
    }
    let game = { 
        code: code,
        type: "SEAFARERS_NORMAL"
    };
    game.error = "No error, all good."
    processGameCode(game, game.code)
    return game
}

async function fetchData(max, min, maxr, minr, max300, maxRow, maxColumn, adjacentSameInput) {
    let game        = {};
    let adjacentSame = "0";
    if (adjacentSameInput) {
        adjacentSame = "1"
    }
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(`https://catan-map-generator-seafarers.herokuapp.com/api/normal`, {
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        }
    });

    const data = await response.json();
    // console.log(data);
    game.type = data.gameType;
    game.code = data.board.code;
        if (data.Error) {
            game.error = data.Error;
        } else {
            game.error = "No error, all good.";
        }
        // console.log("Processing Game Code: " + game.code);
    processGameCode(game, game.code);
    return game;
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

    const [gameCode, setGameCode] = useState( {gameCodeInput: ""} );
    const [inputs, setInputs] = useState(defaultInputs);
    const [checks, setChecks] = useState({
        adjacentSameInput: true
    });
    
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
            inputs.maxColumnInput,
            checks.adjacentSameInput
        );
        setGame(refreshedProps);
    }

    async function getMapByCodeButton() {
        const refreshedProps = await getMapByCode(gameCode.gameCodeInput);
        setGame(refreshedProps);
    }

    async function clearGameCodeInput() {
        setGameCode({gameCodeInput: ""});
    }

    async function resetInput() {
        setInputs(defaultInputs);
        setChecks({adjacentSameInput: true});
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

        <div style={mapStyle} className="container">
            <h3 >4 Players Seafarers Game</h3>
            <p>Game Code: {game.code}</p>
            <p>Error: {game.error}</p>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-primary" type="button" onClick={getMapByCodeButton}>Generate Map by game code</button>
                    <button className="btn btn-outline-danger" type="button" onClick={clearGameCodeInput}><b>X</b></button>
                </div>
                <input id="gameCodeInput" onChange={handleOnChange} type="text" value={gameCode.gameCodeInput} className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
            </div>
            <div className="btn-group" role="group" aria-label="Basic example">
                <div className="btn-group mr-3" role="group" aria-label="Second group">
                    <button id="generateMap4Button" type="button" className="btn btn-outline-success" onClick={refresh}>Generate New Map</button>
                    <button className="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#advancedP4" aria-expanded="false" aria-controls="collapseExample">
                        Advanced Controls
                    </button>
                </div>
            </div>

        </div>
        <div>
            <svg className="chart" width="1650px" height="1200px">

                <CanvasDefinitions />
                <g id="row1" className="tile">
                    <use id="s0" href="#tile" transform="translate(269.6,   100)" fill={game["s0"]}/>
                    <use id="s1" href="#tile" transform="translate(442.8,   100)" fill={game["s1"]}/>
                    <use id="s3" href="#tile" transform="translate(616,     100)" fill={game["s2"]} />
                    <use id="s3" href="#tile" transform="translate(789.2,   100)" fill={game["s3"]}/>
                    <use id="s4" href="#tile" transform="translate(962.4,   100)" fill={game["s4"]}/>
                </g>
                <g id="row2" className="tile">
                    <use id="s5" href="#tile" transform="translate(182.4,   250)"  fill={game["s5"]}/>
                    <use id="s6" href="#tile" transform="translate(356.4,   250)"  fill={game["s6"]}/>
                    <use id="s7" href="#tile" transform="translate(529.6,   250)"  fill={game["s7"]}/>
                    <use id="s8" href="#tile" transform="translate(702.8,   250)"  fill={game["s8"]}/>
                    <use id="s9" href="#tile" transform="translate(876,    250)"   fill={game["s9"]}/>
                    <use id="s10" href="#tile" transform="translate(1049.2, 250)"  fill={game["s10"]}/>
                </g>
                {/* 173.2 */}
                <g id="row3" className="tile">
                    <use id="s11" href="#tile" transform="translate(96.4,   400)"  fill={game["s11"]}/>
                    <use id="s12" href="#tile" transform="translate(269.6,  400)"  fill={game["s12"]}/>
                    <use id="s13" href="#tile" transform="translate(442.8,  400)"  fill={game["s13"]}/>
                    <use id="s14" href="#tile" transform="translate(616,    400)"  fill={game["s14"]}/>
                    <use id="s15" href="#tile" transform="translate(789.2,  400)"  fill={game["s15"]}/>
                    <use id="s16" href="#tile" transform="translate(962.4,  400)"  fill={game["s16"]}/>
                    <use id="s17" href="#tile" transform="translate(1135.6, 400)"  fill={game["s17"]}/>
                </g>
                <g id="row4" className="tile">
                    <use id="s18" href="#tile" transform="translate(10,     550)"  fill={game["s18"]}/>
                    <use id="s19" href="#tile" transform="translate(182.4,  550)"  fill={game["s19"]}/>
                    <use id="s20" href="#tile" transform="translate(356.4,  550)"  fill={game["s20"]}/>
                    <use id="s21" href="#tile" transform="translate(529.6,  550)"  fill={game["s21"]}/>
                    <use id="s22" href="#tile" transform="translate(702.8,  550)"  fill={game["s22"]}/>
                    <use id="s23" href="#tile" transform="translate(876,    550)"  fill={game["s23"]}/>
                    <use id="s24" href="#tile" transform="translate(1049.2, 550)"  fill={game["s24"]}/>
                    <use id="s25" href="#tile" transform="translate(1222.4, 550)"  fill={game["s25"]}/>
                    {/* <use id="s27" href="#tile" transform="translate(1395.6, 550)"  fill={game["s0"]}/> */}
                </g>
                <g id="row5" className="tile">
                    {/* <use id="s27" href="#tile" transform="translate(-76.8,   700)"  fill={game["s0"]}/> */}
                    <use id="s26" href="#tile" transform="translate(96.4,    700)"  fill={game["s26"]}/>
                    <use id="s27" href="#tile" transform="translate(269.6,   700)"  fill={game["s27"]}/>
                    <use id="s28" href="#tile" transform="translate(442.8,   700)"  fill={game["s28"]}/>
                    <use id="s29" href="#tile" transform="translate(616,    700)"  fill={game["s29"]}/>
                    <use id="s30" href="#tile" transform="translate(789.2,  700)"  fill={game["s30"]}/>
                    <use id="s31" href="#tile" transform="translate(962.4,  700)"  fill={game["s31"]}/>
                    <use id="s32" href="#tile" transform="translate(1135.6,  700)"  fill={game["s32"]}/>
                    {/* <use id="s35" href="#tile" transform="translate(1308.8,  700)"  fill={game["s0"]}/> */}
                </g>
                <g id="row6" className="tile">
                    {/* <use id="s34" href="#tile" transform="translate(10,     850)"  fill={game["s0"]}/> */}
                    <use id="s33" href="#tile" transform="translate(182.4,  850)"  fill={game["s33"]}/>
                    <use id="s34" href="#tile" transform="translate(356.4,  850)"  fill={game["s34"]}/>
                    <use id="s35" href="#tile" transform="translate(529.6,  850)"  fill={game["s35"]}/>
                    <use id="s36" href="#tile" transform="translate(702.8,  850)"  fill={game["s36"]}/>
                    <use id="s37" href="#tile" transform="translate(876,    850)"  fill={game["s37"]}/>
                    <use id="s38" href="#tile" transform="translate(1049.2, 850)"  fill={game["s38"]}/>
                    {/* <use id="s43" href="#tile" transform="translate(1222.4, 850)"  fill={game["s0"]}/> */}
                </g>
                <g id="row7" className="tile">
                    <use id="s39" href="#tile" transform="translate(269.6,   1000)"  fill={game["s39"]}/>
                    <use id="s40" href="#tile" transform="translate(442.8,   1000)"  fill={game["s40"]}/>
                    <use id="s41" href="#tile" transform="translate(616,     1000)"  fill={game["s41"]}/>
                    <use id="s42" href="#tile" transform="translate(789.2,   1000)"  fill={game["s42"]}/>
                    <use id="s43" href="#tile" transform="translate(962.4,   1000)"  fill={game["s43"]}/>
                </g>
                

                <g className="numslot" transform="translate(269.6, 100)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn0"]}  />
                    <text id="sn0" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn0"]}>{game["sn0"]} </text>
                </g>
                <g className="numslot" transform="translate(442.8, 100)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn1"]}  />
                    <text id="sn1" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn1"]}>{game["sn1"]} </text>
                </g>
                <g className="numslot" transform="translate(616, 100)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn2"]}  />
                    <text id="sn2" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn2"]}>{game["sn2"]} </text>
                </g>
                <g className="numslot" transform="translate(789.2, 100)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn3"]}  />
                    <text id="sn3" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn3"]}>{game["sn3"]} </text>
                </g>
                <g className="numslot" transform="translate(962.4, 100)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn4"]}  />
                    <text id="sn4" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn4"]}>{game["sn4"]} </text>
                </g>

                <g className="numslot" transform="translate(182.4, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn5"]}  />
                    <text id="sn5" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn5"]}>{game["sn5"]} </text>
                </g>
                <g className="numslot" transform="translate(356.4, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn6"]}  />
                    <text id="sn6" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn6"]}>{game["sn6"]} </text>
                </g>
                <g className="numslot" transform="translate(529.6, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn7"]}  />
                    <text id="sn7" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn7"]}>{game["sn7"]} </text>
                </g>
                <g className="numslot" transform="translate(702.8, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn8"]}  />
                    <text id="sn8" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn8"]}>{game["sn8"]} </text>
                </g>
                <g className="numslot" transform="translate(876, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn9"]}  />
                    <text id="sn9" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn9"]}>{game["sn9"]} </text>
                </g>
                <g className="numslot" transform="translate(1049.2, 250)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn10"]}  />
                    <text id="sn10" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn10"]}>{game["sn10"]} </text>
                </g>

                <g className="numslot" transform="translate(96.4, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn11"]}  />
                    <text id="sn11" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn11"]}>{game["sn11"]} </text>
                </g>
                <g className="numslot" transform="translate(269.6, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn12"]}  />
                    <text id="sn12" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn12"]}>{game["sn12"]} </text>
                </g>
                <g className="numslot" transform="translate(442.8, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn13"]}  />
                    <text id="sn13" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn13"]}>{game["sn13"]} </text>
                </g>
                <g className="numslot" transform="translate(616, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn14"]}  />
                    <text id="sn14" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn14"]}>{game["sn14"]} </text>
                </g>
                <g className="numslot" transform="translate(789.2, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn15"]}  />
                    <text id="sn15" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn15"]}>{game["sn15"]} </text>
                </g>
                <g className="numslot" transform="translate(962.4, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn16"]}  />
                    <text id="sn16" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn16"]}>{game["sn16"]} </text>
                </g>
                <g className="numslot" transform="translate(1135.6, 400)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn17"]}  />
                    <text id="sn17" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn17"]}>{game["sn17"]} </text>
                </g>
                
                <g className="numslot" transform="translate(10, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn18"]}  />
                    <text id="sn18" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn18"]}>{game["sn18"]} </text>
                </g>
                <g className="numslot" transform="translate(182.4, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn19"]}  />
                    <text id="sn19" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn19"]}>{game["sn19"]} </text>
                </g>
                <g className="numslot" transform="translate(356.4, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn20"]}  />
                    <text id="sn20" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn20"]}>{game["sn20"]} </text>
                </g>
                <g className="numslot" transform="translate(529.6, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn21"]}  />
                    <text id="sn21" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn21"]}>{game["sn21"]} </text>
                </g>
                <g className="numslot" transform="translate(702.8, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn22"]}  />
                    <text id="sn22" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn22"]}>{game["sn22"]} </text>
                </g>
                <g className="numslot" transform="translate(876, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn23"]}  />
                    <text id="sn23" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn23"]}>{game["sn23"]} </text>
                </g>
                <g className="numslot" transform="translate(1049.2, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn24"]}  />
                    <text id="sn24" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn24"]}>{game["sn24"]} </text>
                </g>
                <g className="numslot" transform="translate(1222.4, 550)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn25"]}  />
                    <text id="sn25" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn25"]}>{game["sn25"]} </text>
                </g>

                <g className="numslot" transform="translate(96.4, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn26"]}  />
                    <text id="sn26" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn26"]}>{game["sn26"]} </text>
                </g>
                <g className="numslot" transform="translate(269.6, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn27"]}  />
                    <text id="sn27" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn27"]}>{game["sn27"]} </text>
                </g>
                <g className="numslot" transform="translate(442.8, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn28"]}  />
                    <text id="sn28" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn28"]}>{game["sn28"]} </text>
                </g>
                <g className="numslot" transform="translate(616, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn29"]}  />
                    <text id="sn29" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn29"]}>{game["sn29"]} </text>
                </g>
                <g className="numslot" transform="translate(789.2, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn30"]}  />
                    <text id="sn30" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn30"]}>{game["sn30"]} </text>
                </g>
                <g className="numslot" transform="translate(962.4, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn31"]}  />
                    <text id="sn31" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn31"]}>{game["sn31"]} </text>
                </g>
                <g className="numslot" transform="translate(1135.6, 700)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn32"]}  />
                    <text id="sn32" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn32"]}>{game["sn32"]} </text>
                </g>

                <g className="numslot" transform="translate(182.4, 850)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn33"]}  />
                    <text id="sn33" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn33"]}>{game["sn33"]} </text>
                </g>
                <g className="numslot" transform="translate(356.4, 850)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn34"]}  />
                    <text id="sn34" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn34"]}>{game["sn34"]} </text>
                </g>
                <g className="numslot" transform="translate(529.6, 850)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn35"]}  />
                    <text id="sn35" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn35"]}>{game["sn35"]} </text>
                </g>
                <g className="numslot" transform="translate(702.8, 850)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn36"]}  />
                    <text id="sn36" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn36"]}>{game["sn36"]} </text>
                </g>
                <g className="numslot" transform="translate(876, 850)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn37"]}  />
                    <text id="sn37" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn37"]}>{game["sn37"]} </text>
                </g>
                <g className="numslot" transform="translate(1049.2, 850)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn38"]}  />
                    <text id="sn38" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn38"]}>{game["sn38"]} </text>
                </g>

                <g className="numslot" transform="translate(269.6, 1000)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn39"]}  />
                    <text id="sn39" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn39"]}>{game["sn39"]} </text>
                </g>
                <g className="numslot" transform="translate(442.8, 1000)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn40"]}  />
                    <text id="sn40" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn40"]}>{game["sn40"]} </text>
                </g>
                <g className="numslot" transform="translate(616, 1000)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn41"]}  />
                    <text id="sn41" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn41"]}>{game["sn41"]} </text>
                </g>
                <g className="numslot" transform="translate(789.2, 1000)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn42"]}  />
                    <text id="sn42" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn42"]}>{game["sn42"]} </text>
                </g>
                <g className="numslot" transform="translate(962.4, 1000)">
                    <circle cx="260" cy="100" r="30" fill="bisque" style={game["cstylesn43"]}  />
                    <text id="sn43" x="260" y="100" textAnchor="middle" dy="0.3em" style={game["tstylesn43"]}>{game["sn43"]} </text>
                </g>
            </svg>
        </div>
    </Layout>
    );
}

P4.getInitialProps = fetchData;