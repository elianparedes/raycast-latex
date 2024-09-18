import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";
import { mathjax } from "mathjax-full/js/mathjax.js";
import { SVG } from "mathjax-full/js/output/svg.js";

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const tex = new TeX({ packages: AllPackages });
const svg = new SVG({ fontCache: "local" });
const html = mathjax.document("", { InputJax: tex, OutputJax: svg });

export const renderSymbolToBase64 = async (symbol: string): Promise<string> => {
  try {
    const node = html.convert(symbol, { display: true });
    const svgString = adaptor.innerHTML(node);

    const cleanedSVG = svgString.trim().replace(/\s+/g, " ");

    const base64SVG = btoa(cleanedSVG);
    const base64 = `data:image/svg+xml;base64,${base64SVG}`;

    return base64;
  } catch (error) {
    console.error("Error rendering LaTeX:", error);
    return "";
  }
};
