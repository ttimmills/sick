import * as ts from 'typescript';

let transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    let visitor = (node: ts.Node): ts.Node => {
      if (ts.isIdentifier(node)) {
        switch (node.escapedText) {
          case 'babel':
            return ts.factory.createIdentifier('typescript');

          case 'plugins':
            return ts.factory.createIdentifier('transformers');
        }
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor, ts.isSourceFile);
  };
};

export default transformer;
