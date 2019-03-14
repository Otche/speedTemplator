const consts = require('./const');
const fs = require('fs');
const utils = require('./utils');
const TXT_EXENTION = ['svg','css'];
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
        const mapOfVars = this.htmlTemplate.match(consts.TEMPLATE_REGEXP);
        if(!mapOfVars) return;
        return mapOfVars.map(tmpVar => 
                        tmpVar.substring(2, 
                            tmpVar.length - 2));
    }

    /**
     * remplace variable in template
     * @param {*} simpleValueConfig simple value to remplce
     * @param {*} fileRefConfig URI to remplace with base64 or with here text context
     */
    async compileTemplate(simpleValueConfig, fileRefConfig){
        this.compileSimpleValue(simpleValueConfig);
        
        return (await this.compileFilesReferences(fileRefConfig));
    }

    getTemplate(){
        return this.htmlTemplate;
    }


    /**
     * 
     * @param {*} simpleValueConfig 
     */
    compileSimpleValue(simpleValueConfig){
        const vars = this.findVarsInHtml();
        vars.forEach(_var => {
            if(!simpleValueConfig[_var]) return;
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

        return new Promise(async  (resolve, reject) => {
            const fileRefConfigKeys = Object.keys(fileRefConfig);
            try {
                await fileRefConfigKeys.forEach(async ( key , index)=> {
                    const fileURI = fileRefConfig[key];
                    const fileExt = (fileURI.split('.')[1]).toLowerCase();
                    const fileBin = (await utils.readFile(fileURI))
                    if(TXT_EXENTION.includes(fileExt)){
                        fileRefConfig[key] = fileBin.toString();
                    }else if(BINARY_EXTENTION.includes(fileExt)){
                        fileRefConfig[key] = "data:image/png;base64,"+(new Buffer(fileBin).toString('base64'));
                    }
    
                    if(index == fileRefConfigKeys.length - 1 ){
                        this.compileSimpleValue(fileRefConfig);
                        resolve(this.htmlTemplate);
                    }
                });      
            } catch (error) {
                reject(error);
            }
        });
    }
}