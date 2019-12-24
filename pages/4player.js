import Layout from '../components/MyLayout.js';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const SFP4 = props => (
  <Layout>
    <div className="seafarers_normal_map" id="4pchart" >
        <div className="container">
          <h3 >4 Players Seafarers Game</h3>
          <p>Game Code: {props.code}</p>
          <div className="btn-group" role="group" aria-label="Basic example">
              <div className="btn-group mr-2" role="group" aria-label="Second group">
                  <button id="generateMap4Button" type="button" className="btn btn-primary" onClick={refresh}>Generate New Map</button>
              </div>
          </div>
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