import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import {
    mapStyle, 
    processGameCode,
} from '../components/Catan.js';

export default function P4(props) {

    return (
        <Layout>  
            <div style={mapStyle} className="container">
                <h3 >Give Feedback</h3>
            </div>
            <div>
                <p>
                    <ul>
                        <li>Send me an Email: <a href="mailto:joostvd@gmail.com">joostvdg@gmail.com</a></li>
                        <li>Or leave a comment on <a href="https://catan-map-generator.disqus.com">Disqus</a> <i>(requires an account)</i></li>
                    </ul>
                </p>
            </div>
    </Layout>
    );
}