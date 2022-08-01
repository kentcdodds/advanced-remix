// mostly moving this to its own file because unifieds types are
// pretty nuts and makes in-editor TypeScript very slow 😅
export async function getReadmeTitle(readme: string) {
  const [{ fromMarkdown }, { visit }] = await Promise.all([
    import("mdast-util-from-markdown"),
    import("unist-util-visit"),
  ]);
  const ast = fromMarkdown(readme);
  let title = "";
  visit(ast, "heading", (node) => {
    if (title) return;
    if (node.depth === 1) {
      visit(node, "text", (textNode) => {
        title = `${title} ${textNode.value}`.trim();
      });
    }
  });
  if (!title) {
    const excerpt = readme.slice(0, 50);
    throw new Error(
      `Could not find title in README.md. Here's an excerpt:\n\n${excerpt}`
    );
  }
  return title.replace(/^\d+\. /, "").trim();
}
