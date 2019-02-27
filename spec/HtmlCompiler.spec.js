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


const compileResult = `<!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8">
        <title>Inscrire un titre ici</title>
        <!-- On peut avoir d'autres méta-données ici -->
      </head>
      <body>
          test1
        <!-- Ici, on placera tout le contenu à destination 
        de l'utilisateur -->
        <div>test2</div>
      </body>
    </html>`;

describe("htmlCompiler : html template processing and remplace with values", () => {

  const vars = htmlCompiler.findVarsInHtml();

  it(" htmlCompiler.findVarsInHtml : template vars found", () => {
    expect(vars).toEqual(['var1', 'var2.subvar1']);
  });


  it("mapTemplateVarsToConfigValues : map configuration to templating", () => {
    const templateResult = htmlCompiler.compileSimpleValue({
      'var1': 'test1', 'var2.subvar1': 'test2'
    });
    expect(templateResult).toEqual(compileResult);
  });






});