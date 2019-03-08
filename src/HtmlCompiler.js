const consts = require('./const');
const fs = require('fs');

const TXT_EXENTION = ['svg'];
const BINARY_EXTENTION = ['png','jpg','jpeg','gif'];

/**
 * 
 */
exports.HtmlCompiler = class HtmlCompiler {
    /**
     * 
     * @param {*} htmlTemplate put html file
     */
    constructor(htmlTemplate) {
        this.htmlTemplate = htmlTemplate;
    }

    /**
     * find template in variable
     */
    findVarsInHtml() {
        return this.htmlTemplate
                    .match(consts.TEMPLATE_REGEXP)
                    .map(tmpVar => 
                        tmpVar.substring(2, tmpVar.length - 2));
    }

    /**
     * remplace variable in template
     * @param {*} simpleValueConfig simple value to remplce
     * @param {*} fileRefConfig URI to remplace with base64 or with here text context
     */
    async compileTemplate(simpleValueConfig, fileRefConfig){
        this.compileSimpleValue(simpleValueConfig);
        return this.htmlTemplate;

    }


    /**
     * 
     * @param {*} simpleValueConfig 
     */
    compileSimpleValue(simpleValueConfig){
        const vars = this.findVarsInHtml();
        vars.forEach(_var => {
            this.htmlTemplate = 
                this.htmlTemplate.replace("{{"+_var+"}}", 
                    simpleValueConfig[_var]);
        });
        return this.htmlTemplate; 
    }


    /**
     * 
     * @param {*} fileRefConfig 
     */
    async compileFilesReferences(fileRefConfig){
        const fileRefConfigKeys = Object.keys(fileRefConfig);
        
        await fileRefConfigKeys.forEach(async key => {
            const fileURI = fileRefConfig[key];
            const fileExt = val.split('.')[1];
            try {
                const fileBin = await fs.readFile(fileURI)
                if(TXT_EXENTION.includes(fileExt)){
                    fileRefConfig[key] = fileBin.toString();
                }else if(BINARY_EXTENTION.includes(fileExt)){
                    fileRefConfig[key] = new Buffer(fileBin).toString('base64');
                }
            } catch (error) {
                throw error;
            }
        });

        this.compileSimpleValue(fileRefConfig);
        return this.htmlTemplate; 
    }

    

}