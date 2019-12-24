import Layout from '../components/MyLayout.js';
import CanvasDefinitions from '../components/CatanPolygon.js';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import {
  mapStyle, 
  processGameCode
} from '../components/Catan.js';

async function fetchData() {
  let game        = {};

  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch('https://catan-map-generator.herokuapp.com/api/map/code?type=large&max=365&min=156&minr=65&maxr=140&max300=22', {
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });

  const data = await response.json()
  console.log(data)
  game.code = data.GameCode;

  processGameCode(game, game.code)

  return game
}


export default function P6(props) {
  
  const [
    game,
    setGame
  ] = useState(props);

  async function refresh() {
    const refreshedProps = await fetchData();
    setGame(refreshedProps);
  }

  return (
    <Layout>
      <div style={mapStyle} id="6pchart" >
          <div className="container">
            <h3 >6 Players Normal Game</h3>
            <p>Game Code: {game.code}</p>
            <div className="btn-group" role="group" aria-label="Basic example">
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                    <button id="generateMap4Button" type="button" className="btn btn-outline-dark" onClick={refresh}>Generate New Map</button>
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