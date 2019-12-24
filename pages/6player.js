import Layout from '../components/MyLayout.js'

const Index = props => (
  <Layout>
    <h3>6 Players</h3>
    <p>Game Code: {props.code}</p>
  </Layout>
)

Index.getInitialProps = async function() {
 
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

export default Index