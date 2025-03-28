import * as ts from 'typescript';

let transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    let visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
      // If it is a expression statement,
      if (ts.isExpressionStatement(node)) {
        // Return it twice.
        // Effectively duplicating the statement
        return [node, node];
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor, ts.isSourceFile);
  };
};

export default transformer;
