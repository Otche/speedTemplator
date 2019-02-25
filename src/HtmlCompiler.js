const consts = require('./const');

exports.HtmlCompiler = class HtmlCompiler {
    
    constructor(htmlTemplate){
        this.htmlTemplate = htmlTemplate;
    }

    findVarsInHtml(){
        return this.htmlTemplate.match(consts.TEMPLATE_REGEXP).map(tmpVar => tmpVar.substring(2, tmpVar.length - 2));
    }

    static accessToValueWithArrayOfFloorValue(floorArray, json){
        let curretVal = json;
        floorArray.forEach(floorVar => {
            if(!curretVal) return;
            curretVal =  curretVal[floorVar];
        });
        return curretVal 
    }
    
}