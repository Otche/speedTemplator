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

let htmlCompilerWithURI = new HtmlCompiler(`<!DOCTYPE html>
  <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Inscrire un titre ici</title>
      <!-- On peut avoir d'autres méta-données ici -->
    </head>
    <body>
        <img src="{{var1}}" />
      <!-- Ici, on placera tout le contenu à destination 
      de l'utilisateur -->
      <div>
        <img src="{{var2.subvar1}}"/>
      </div>
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

  it("htmlCompiler.findVarsInHtml : template vars found", () => {
    expect(vars).toEqual(['var1', 'var2.subvar1']);
  });


  it("htmlCompiler.compileSimpleValue : map  template  configuration to templating", () => {
    const templateResult = htmlCompiler.compileSimpleValue({
      'var1': 'test1', 'var2.subvar1': 'test2'
    });
    expect(templateResult).toEqual(compileResult);
  });


  it("htmlCompiler.compileFilesReferences : map configuration with URI and put it in template", async () => {
    const templateResult = await htmlCompilerWithURI.compileFilesReferences({
      'var1': '/home/amine/Bureau/speedTemplator/demo/assets/telephone-receiver.svg',
      'var2.subvar1': '/home/amine/Bureau/speedTemplator/demo/assets/tr.png'
    });
    expect(templateResult == htmlCompilerWithURI).toBe(false);
  });
});