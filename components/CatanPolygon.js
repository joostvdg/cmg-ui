import {polygonStyle} from './Catan.js'

export default function CanvasDefinitions() {
    return (
        <defs>
            <pattern id="desert" height="100%" width="100%" patternContentUnits="objectBoundingBox">
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
            <pattern id="gold" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                <image height="1" width="1" preserveAspectRatio="none" href="https://catanmapimages.s3.eu-central-1.amazonaws.com/gold.jpg" />
            </pattern>
            <pattern id="sea" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                <image  height="1" width="1" preserveAspectRatio="none" href="https://catanmapimages.s3.eu-central-1.amazonaws.com/sea.jpg" />
            </pattern>
            <g>
                <polygon style={polygonStyle} clipPath="fill-box" colorRendering="optimizeSpeed" id="tile" points="260,0 346,50 346,150 260,200 173,150 173,50 " />
            </g>
        </defs>
    );
}