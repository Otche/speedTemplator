const HtmlCompiler = require("../src/HtmlCompiler.js").HtmlCompiler;
let htmlCompiler = new HtmlCompiler(`<!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8">
        <title>Inscrire un titre ici</title>
        <!-- On peut avoir d'autres méta-données ici -->
      </head>
      <body>
          {{var1}}
        <!-- Ici, on placera tout le contenu à destination 
        de l'utilisateur -->
        <div>{{var2.subvar1}}</div>
      </body>
    </html>`);

describe("html template processing and remplace with values", () => {
    
    it("template vars", () => {
        const vars = htmlCompiler.findVarsInHtml();
        expect(vars).toEqual(['var1','var2.subvar1']);
    });
});