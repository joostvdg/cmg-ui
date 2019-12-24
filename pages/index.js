import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = props => (
  <Layout>
    <p>Game Code: {props.code}</p>
  </Layout>
)

Index.getInitialProps = async function() {
  // const request = new Request('https://catan-map-generator.herokuapp.com/api/map/code');
  // const res = await fetch(request);
  
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

  return {
    code: data.GameCode
  }
}

export default Index
