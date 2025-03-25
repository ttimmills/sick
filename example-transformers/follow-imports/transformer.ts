import * as ts from 'typescript';

let transformerProgram = (program: ts.Program) => {
  let transformerFactory: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
      let visitor = (node: ts.Node): ts.Node => {
        if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
          let typeChecker = program.getTypeChecker();
          let importSymbol = typeChecker.getSymbolAtLocation(node.moduleSpecifier)!;
          let exportSymbols = typeChecker.getExportsOfModule(importSymbol);

          exportSymbols.forEach(symbol =>
            console.log(
              `found "${
                symbol.escapedName
              }" export with value "${symbol.valueDeclaration!.getText()}"`
            )
          );

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
