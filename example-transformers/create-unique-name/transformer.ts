import * as ts from 'typescript';

let transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    let visitor = (node: ts.Node): ts.Node => {
      if (ts.isVariableDeclarationList(node)) {
        return ts.factory.updateVariableDeclarationList(node, [
          ...node.declarations,
          ts.factory.createVariableDeclaration(
            ts.factory.createUniqueName('hello'),
            undefined /* exclamation token */,
            undefined /* type */,
            ts.factory.createStringLiteral('world')
          ),
        ]);
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor, ts.isSourceFile);
  };
};

export default transformer;
