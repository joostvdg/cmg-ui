export const numberStyle = {
    color: "black",
    fontSize: "40px",
    fontWeight: "bold",
    fontFamily: "monospace",
}

export const redNumberStyle = {
    fontSize: "40px",
    fontWeight: "bold",
    fontFamily: "monospace",
    fill: "IndianRed",
    stroke: "IndianRed",
}

export const redCircleStyle = {
    stroke: "IndianRed",
    strokeWidth: "4px"
}

export const noNumberStyle = {
    fontSize: "0px",
    fontWeight: "bold",
    fontFamily: "monospace",
    display: "none"
}

export const noCircleStyle = {
    stroke: "Grey",
    strokeWidth: "0px",
    display: "none"
}

export const circleStyle = {
    stroke: "black",
    strokeWidth: "3px"
}
export const polygonStyle = {
    stroke: "Wheat",
    strokeWidth: "4px",
    boxShadow: "inset -1px 60px 68px -28px rgba(90, 90, 90, 1)",
    border: "10px solid Wheat",
    backgroundColor: "rgba(255, 255, 255, .15)",
    backdropFilter: "blur(5px)"
}

export const mapStyle = {
    backgroundColor: "Cornsilk",
}

export const sliderBoxStyle = {
    backgroundColor: "ivory",
    border: "5px solid ivory",
    
}

export const sliderGroupStyle = {
    backgroundColor: "ivory",
    border: "2px solid Wheat",
    padding: "10px",
    width: "800px"
}

export const sliderGroup = {
    backgroundColor: "ivory",
    border: "0px",
    boxSizing: "content-box",
    height: "60px"
}

export const sliderStyle = {
    appearance: "none",
    cursor: "pointer",
    backgroundColor: "black",
    borderBottomColor: "Wheat",
    borderLeftColor: "Wheat",
    borderRightColor: "Wheat",
    borderTopColor: "Wheat",
    WebkitTapHighlightColor: "Cornsilk",
    color: "Cornsilk",
    
}

// SEAFARERS CODE
// 
// 7p7p3i7p3i2h7p5h4b7p3b4g1g7p8c7p7p3b7p5h7p7p4b7p1g1h1h8c7p7p8b1g8c4a


export const tileNumbers = new Map();  
tileNumbers.set("p", "0");
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


export const tileCodes   = new Map();
tileCodes.set("0", "-");
tileCodes.set("1", "url(#forest)");
tileCodes.set("2", "url(#pasture)");
tileCodes.set("3", "url(#field)");
tileCodes.set("4", "url(#hill)");
tileCodes.set("5", "url(#mountain)");
tileCodes.set("6", "url(#desert)");
tileCodes.set("7", "url(#sea)");
tileCodes.set("8", "url(#gold)");

export const tileHarbors   = new Map();
tileHarbors.set("0", "url(#all-harbor)"); // should be ALL 1 v 3
tileHarbors.set("1", "url(#forest-harbor)");
tileHarbors.set("2", "url(#pasture-harbor)");
tileHarbors.set("3", "url(#field-harbor)");
tileHarbors.set("4", "url(#hill-harbor)");
tileHarbors.set("5", "url(#mountain-harbor)");
tileHarbors.set("6", "-");


export function configureTile(game, landscape, number, tileNumber, harbor) {
    game["s"  +tileNumber] = landscape;
    game["sn" +tileNumber] = number;
    game["h"  +tileNumber] = harbor;

    if (number === "6" || number === "8") {
        game["tstylesn"+tileNumber]  = redNumberStyle;
        game["cstylesn"+tileNumber]  = redCircleStyle;
    } else if(number === "" || number === "0") { 
        game["tstylesn"+tileNumber]  = noNumberStyle;
        game["cstylesn"+tileNumber]  = noCircleStyle;
        game["sn" +tileNumber] = "";
    } else {
        game["tstylesn"+tileNumber]  = numberStyle;
        game["cstylesn"+tileNumber]  = circleStyle;
    }
}

export function processGameCode(game, gameCode) {
    const codeLength = gameCode.length;
    let tileNumber = 0;

    for(let step =0; step < codeLength;  step++) {
        let landscapeCode = gameCode.charAt(step);
        let landscape     = tileCodes.get(landscapeCode);
        let numberCode    = gameCode.charAt(step+1);
        let number        = tileNumbers.get(numberCode);
        let harborCode    = gameCode.charAt(step+2);
        let harbor        = tileHarbors.get(harborCode);
        configureTile(game, landscape, number, tileNumber, harbor)
        tileNumber++;
        // go past number/harbor
        if (game.type != "SEAFARERS_NORMAL") {        
            step++;
        } 
        step++;
    }
}
