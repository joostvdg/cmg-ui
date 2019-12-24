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

export const circleStyle = {
    stroke: "black",
    strokeWidth: "3px"
}
export const polygonStyle = {
    stroke: "Wheat",
    strokeWidth: "4px"
}

export const mapStyle = {
    backgroundColor: "Cornsilk",
}

export const tileNumbers = new Map();  
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

export function configureTile(game, landscape, number, tileNumber) {
    game["s"  +tileNumber] = landscape;
    game["sn" +tileNumber] = number;

    if (number === "6" || number === "8") {
        game["tstylesn"+tileNumber]  = redNumberStyle;
        game["cstylesn"+tileNumber]  = redCircleStyle;
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
        configureTile(game, landscape, number, tileNumber)
        tileNumber++;
        // go past number/harbor
        step++;
        step++;
    }
}