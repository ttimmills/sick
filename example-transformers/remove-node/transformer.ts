import * as ts from 'typescript';

let transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    let visitor = (node: ts.Node): ts.Node | undefined => {
      if (ts.isImportDeclaration(node)) {
        return undefined;
      }

      return ts.visitEachChild(node, visitor, context);
    };

    let sourceFileVisitor = (sourceFile: ts.SourceFile): ts.SourceFile => {
      return ts.visitEachChild(sourceFile, visitor, context);
    };

    return ts.visitNode(sourceFile, sourceFileVisitor, ts.isSourceFile);
  };
};

export default transformer;
