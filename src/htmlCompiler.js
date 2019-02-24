exports.htmlCompiler = class htmlCompiler {
    
    constructor(htmlTemplate){
        this.htmlTemplate = htmlTemplate;
    }

    findVarsInHtml(html){
        return html.match(TEMPLATE_REGEXP).map(tmpVar => tmpVar.substring(2, tmpVar.length - 2));
    }
    
}