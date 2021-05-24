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

            <linearGradient  id="mountain-harbor">
                <stop offset="0%"   stopColor="#6cc0d4" />
                <stop offset="100%" stopColor="#475c61" />
            </linearGradient >
            <linearGradient  id="all-harbor">
                <stop offset="0%"   stopColor="black" />
                <stop offset="100%" stopColor="black" />
            </linearGradient>
            <linearGradient  id="field-harbor">
                <stop offset="0%"   stopColor="#faf798" />
                <stop offset="100%" stopColor="#e3d024" />
            </linearGradient >
            <linearGradient  id="forest-harbor">
                <stop offset="0%"   stopColor="#279c5f" />
                <stop offset="100%" stopColor="#004f26" />
            </linearGradient >
            <linearGradient  id="hill-harbor">
                <stop offset="0%"   stopColor="#e8b3b3" />
                <stop offset="100%" stopColor="#6e4949" />
            </linearGradient >
            <linearGradient  id="pasture-harbor">
                <stop offset="0%"   stopColor="#b4e68e" />
                <stop offset="100%" stopColor="#85d945" />
            </linearGradient >

            <g>
                <polygon style={polygonStyle} clipPath="fill-box" colorRendering="optimizeSpeed" id="tile" points="260,0 346,50 346,150 260,200 173,150 173,50 " />
            </g>
        </defs>
    );
}