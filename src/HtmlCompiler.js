const consts = require('./const');

exports.HtmlCompiler = class HtmlCompiler {

    constructor(htmlTemplate) {
        this.htmlTemplate = htmlTemplate;
    }

    findVarsInHtml() {
        return this.htmlTemplate
                    .match(consts.TEMPLATE_REGEXP)
                    .map(tmpVar => 
                        tmpVar.substring(2, tmpVar.length - 2));
    }


    compileTemplate(simpleValueConfig, fileRefConfig){
        this.compileSimpleValue(simpleValueConfig);
        return this.htmlTemplate;

    }

    compileSimpleValue(simpleValueConfig){
        const vars = this.findVarsInHtml();
        vars.forEach(_var => {
            this.htmlTemplate = this.htmlTemplate.replace("{{"+_var+"}}", simpleValueConfig[_var]);
        });
        return this.htmlTemplate; 
    }

}