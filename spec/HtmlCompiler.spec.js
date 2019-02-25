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

describe("htmlCompiler : html template processing and remplace with values", () => {
  
  const vars = htmlCompiler.findVarsInHtml();
  
  it(" htmlCompiler.findVarsInHtml : template vars found", () => {
    expect(vars).toEqual(['var1', 'var2.subvar1']);
  });

  it("HtmlCompiler.accessToValueWithArrayOfFloorValue : using array of json floor to acces to valus", () => {
    const jsonTest = {floor1 : { floor2 : 0 }, floor2:'a' }
    expect(HtmlCompiler.accessToValueWithArrayOfFloorValue(['floor1', 'floor2'], jsonTest)).toBe(0);
    expect(HtmlCompiler.accessToValueWithArrayOfFloorValue(['floor2'], jsonTest)).toBe('a');
    expect(HtmlCompiler.accessToValueWithArrayOfFloorValue(['floor2', 'floor2'], jsonTest)).toBeUndefined();
  });

  




});