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


const SFP4 = props => (
  <Layout>
    <div className="seafarers_normal_map" id="4pchart" >
        <div className="container">
            <h3 >4 Players Seafarers Game</h3>

            <svg className="chart" width="1200px" height="900px">

                <CanvasDefinitions />

                <g id="row1" className="tile">
                    <use id="s1" href="#tile" transform="translate(23.2,    100)"/>
                    <use id="s2" href="#tile" transform="translate(196.4,   100)"/>
                    <use id="s3" href="#tile" transform="translate(369.6,   100)"/>
                    <use id="s4" href="#tile" transform="translate(542.8,   100)"/>
                    <use id="s5" href="#tile" transform="translate(716,     100)" />
                </g>
                <g id="row2" className="tile">
                    <use id="s6" href="#tile" transform="translate(6.6,    250)" />
                    <use id="s7" href="#tile" transform="translate(179.8,  250)"/>
                    <use id="s8" href="#tile" transform="translate(353,    250)" />
                    <use id="s9" href="#tile" transform="translate(526.2,  250)" />
                    <use id="s10" href="#tile" transform="translate(699.4,  250)" />
                    <use id="s11" href="#tile" transform="translate(872.6,  250)" />
                </g>
                <g id="row3" className="tile">
                    <use id="s6" href="#tile" transform="translate(6.6,    400)" />
                    <use id="s7" href="#tile" transform="translate(179.8,  400)"/>
                    <use id="s8" href="#tile" transform="translate(353,    400)" />
                    <use id="s9" href="#tile" transform="translate(526.2,  400)" />
                    <use id="s10" href="#tile" transform="translate(699.4,  400)" />
                    <use id="s11" href="#tile" transform="translate(872.6,  400)" />
                </g>
                <g id="row4" className="tile">
                    <use id="s6" href="#tile" transform="translate(6.6,    550)" />
                    <use id="s7" href="#tile" transform="translate(179.8,  550)"/>
                    <use id="s8" href="#tile" transform="translate(353,    550)" />
                    <use id="s9" href="#tile" transform="translate(526.2,  550)" />
                    <use id="s10" href="#tile" transform="translate(699.4,  550)" />
                    <use id="s11" href="#tile" transform="translate(872.6,  550)" />
                </g>
                <g id="row5" className="tile">
                    <use id="s6" href="#tile" transform="translate(6.6,    700)" />
                    <use id="s7" href="#tile" transform="translate(179.8,  700)"/>
                    <use id="s8" href="#tile" transform="translate(353,    700)" />
                    <use id="s9" href="#tile" transform="translate(526.2,  700)" />
                    <use id="s10" href="#tile" transform="translate(699.4,  700)" />
                    <use id="s11" href="#tile" transform="translate(872.6,  700)" />
                </g>
                <g id="row6" className="tile">
                    <use id="s6" href="#tile" transform="translate(6.6,    850)" />
                    <use id="s7" href="#tile" transform="translate(179.8,  850)"/>
                    <use id="s8" href="#tile" transform="translate(353,    850)" />
                    <use id="s9" href="#tile" transform="translate(526.2,  850)" />
                    <use id="s10" href="#tile" transform="translate(699.4,  850)" />
                    <use id="s11" href="#tile" transform="translate(872.6,  850)" />
                </g>
                <g id="row7" className="tile">
                    <use id="s1" href="#tile" transform="translate(23.2,    1000)"/>
                    <use id="s2" href="#tile" transform="translate(196.4,   1000)"/>
                    <use id="s3" href="#tile" transform="translate(369.6,   1000)"/>
                    <use id="s4" href="#tile" transform="translate(542.8,   1000)"/>
                    <use id="s5" href="#tile" transform="translate(716,     1000)" />
                </g>

            </svg>
        </div>
    </div>
  </Layout>
);

SFP4.getInitialProps = async function() {

  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch('https://catan-map-generator.herokuapp.com/api/map?type=large&max=365&min=156&minr=65&maxr=140&max300=22', {
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });

  const data = await response.json()

  console.log(data)

  return {
    code: data.GameCode
  }
}

export default SFP4