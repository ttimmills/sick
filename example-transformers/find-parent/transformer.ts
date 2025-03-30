import * as ts from 'typescript';

let findParent = (node: ts.Node, predicate: (node: ts.Node) => boolean) => {
  if (!node.parent) {
    return undefined;
  }

  if (predicate(node.parent)) {
    return node.parent;
  }

  return findParent(node.parent, predicate);
};

let transformerFactory: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    let visitor = (node: ts.Node): ts.Node => {
      if (ts.isStringLiteral(node)) {
        let parent = findParent(node, ts.isFunctionDeclaration);
        if (parent) {
          console.log('string literal has a function declaration parent');
        }

        return node;
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor, ts.isSourceFile);
  };
};

export default transformerFactory;
