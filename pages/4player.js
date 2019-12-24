import Layout from '../components/MyLayout.js'
import { useState } from 'react';

const numberStyle = {
  color: "black",
  fontSize: "40px",
  fontWeight: "bold",
  fontFamily: "Ubuntu Mono",
}
const circleStyle = {
  stroke: "black",
  strokeWidth: "3px"
}
const polygonStyle = {
  stroke: "bisque",
  strokeWidth: "3px"
}

async function fetchData() {
  // const request = new Request('https://catan-map-generator.herokuapp.com/api/map/code');
  // const res = await fetch(request);
  

  let tileCodes   = new Map();
  let tileNumbers = new Map();
  let game        = {};

  tileCodes.set("0", "-");
  tileCodes.set("1", "url(#forest)");
  tileCodes.set("2", "url(#pasture)");
  tileCodes.set("3", "url(#field)");
  tileCodes.set("4", "url(#hill)");
  tileCodes.set("5", "url(#mountain)");
  tileCodes.set("6", "url(#desert)");

  tileNumbers.set("z", "0");
  tileNumbers.set("a", "2");
  tileNumbers.set("b", "3");
  tileNumbers.set("c", "4");
  tileNumbers.set("d", "5");
  tileNumbers.set("e", "6");
  tileNumbers.set("f", "8");
  tileNumbers.set("g", "9");
  tileNumbers.set("h", "10");
  tileNumbers.set("i", "11");
  tileNumbers.set("j", "12");

  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch('https://catan-map-generator.herokuapp.com/api/map/code', {
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });

  const data = await response.json()
  console.log(data)
  game.code = data.GameCode;

  const codeLength = data.GameCode.length;
  let tileNumber = 0;
  for(let step =0; step < codeLength;  step++) {
    let landscapeCode = data.GameCode.charAt(step);
    let numberCode    = data.GameCode.charAt(step+1);
    game["s"  +tileNumber]  = tileCodes.get(landscapeCode);
    game["sn" +tileNumber]  = tileNumbers.get(numberCode);
    tileNumber++;
    // go past number/harbor
    step++;
    step++;
  }

  console.log("Game Tiles");
  // console.log(tiles);
  console.log(game);

  return game
}

export default function P4(props) {
  
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
      <h3>4 Players</h3>
      <p>Game Code: {props.code}</p>
      <div className="normal_map" id="4pchart" >
        <button onClick={refresh}>New Map</button>
          <svg className="chart" width="1200px" height="900px">
              
              <defs>
                  <pattern id="desert" height="100%" width="100%"  patternContentUnits="objectBoundingBox">
                      <image height="1" width="1" preserveAspectRatio="none" href="https://catanmapimages.s3.eu-central-1.amazonaws.com/desert.jpg" />
                  </pattern>
                  <pattern id="field" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                      <image height="1" width="1" preserveAspectRatio="none" href="https://catanmapimages.s3.eu-central-1.amazonaws.com/field.jpg" />
                  </pattern>
                  <pattern id="forest" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                      <image height="1" width="1" preserveAspectRatio="none" href="https://catanmapimages.s3.eu-central-1.amazonaws.com/forest.jpg" />
                  </pattern>
                  <pattern id="mountain" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                      <image height="1" width="1" preserveAspectRatio="none" href="https://catanmapimages.s3.eu-central-1.amazonaws.com/mountain.jpg" />
                  </pattern>
                  <pattern id="pasture" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                      <image height="1" width="1" preserveAspectRatio="none" href="https://catanmapimages.s3.eu-central-1.amazonaws.com/pasture.jpg" />
                  </pattern>
                  <pattern id="hill" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                      <image height="1" width="1" preserveAspectRatio="none" href="https://catanmapimages.s3.eu-central-1.amazonaws.com/river.jpg" />
                  </pattern>
                  <g>
                      <polygon style={polygonStyle} id="tile" points="260,0 346,50 346,150 260,200 173,150 173,50 " />
                  </g>
                  <patter id="numberCircle" style={circleStyle}>
                      <circle cx="260" cy="100" r="30" fill="bisque" />
                      <text  x="260" y="100" textAnchor="middle" dy="0.3em"></text>
                  </patter>
              </defs>

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
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn0" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn0"]} </text>
              </g>
              <g className="numslot" transform="translate(369.6, 100)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn1" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn1"]}</text>
              </g>
              <g className="numslot" transform="translate(542.8, 100)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn2" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn2"]}</text>
              </g>



              <g className="numslot" transform="translate(109.8, 250)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn3" x="260" y="100" textAnchor="middle" dy="0.3em"style={numberStyle}>{game["sn3"]}</text>
              </g>
              <g className="numslot" transform="translate(283, 250)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn4" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn4"]}</text>
              </g>
              <g className="numslot" transform="translate(456.2, 250)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn5" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn5"]}</text>
              </g>
              <g className="numslot" transform="translate(629.4, 250)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn6" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn6"]}</text>
              </g>


              <g className="numslot" transform="translate(23.2, 400)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn7" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn7"]}</text>
              </g>
              <g className="numslot" transform="translate(196.4, 400)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn8" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn8"]}</text>
              </g>
              <g className="numslot" transform="translate(369.6, 400)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn9" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn9"]}</text>
              </g>
              <g className="numslot" transform="translate(542.8, 400)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn10" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn10"]}</text>
              </g>
              <g className="numslot" transform="translate(716, 400)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn11" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn11"]}</text>
              </g>
              
              <g className="numslot" transform="translate(109.8, 550)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn12" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn12"]}</text>
              </g>
              <g className="numslot" transform="translate(283, 550)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn13" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn13"]}</text>
              </g>
              <g className="numslot" transform="translate(456.2, 550)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn14" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn14"]}</text>
              </g>
              <g className="numslot" transform="translate(629.4, 550)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn15" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn15"]}</text>
              </g>


              <g className="numslot" transform="translate(196.4, 700)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn16" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn16"]}</text>
              </g>
              <g className="numslot" transform="translate(369.6, 700)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn17" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn17"]}</text>
              </g>
              <g className="numslot" transform="translate(542.8, 700)">
                  <circle cx="260" cy="100" r="30" fill="bisque" />
                  <text id="sn18" x="260" y="100" textAnchor="middle" dy="0.3em" style={numberStyle}>{game["sn18"]}</text>
              </g>
          </svg>
      </div>
    </Layout>
  );
}

P4.getInitialProps = fetchData;