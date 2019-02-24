const consts = require('./const');

exports.HtmlCompiler = class HtmlCompiler {
    
    constructor(htmlTemplate){
        this.htmlTemplate = htmlTemplate;
    }

    findVarsInHtml(){
        return this.htmlTemplate.match(consts.TEMPLATE_REGEXP).map(tmpVar => tmpVar.substring(2, tmpVar.length - 2));
    }
    
}