import * as ts from 'typescript';

let transformerProgram = (program: ts.Program) => {
  let typeChecker = program.getTypeChecker();

  // Create array of found symbols
  let foundSymbols = new Array<ts.Symbol>();

  let transformerFactory: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
      let visitor = (node: ts.Node): ts.Node => {
        if (ts.isIdentifier(node)) {
          let relatedSymbol = typeChecker.getSymbolAtLocation(node)!;

          // Check if array already contains same symbol - check by reference
          if (foundSymbols.includes(relatedSymbol)) {
            let foundIndex = foundSymbols.indexOf(relatedSymbol);
            console.log(
              `Found existing symbol at position = ${foundIndex} and name = "${relatedSymbol.name}"`
            );
          } else {
            // If not found, Add it to array
            foundSymbols.push(relatedSymbol);

            console.log(
              `Found new symbol with name = "${
                relatedSymbol.name
              }". Added at position = ${foundSymbols.length - 1}`
            );
          }

          return node;
        }

        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(sourceFile, visitor, ts.isSourceFile);
    };
  };

  return transformerFactory;
};

export default transformerProgram;
