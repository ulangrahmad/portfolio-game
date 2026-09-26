import { createRoot } from "react-dom/client";
import "./main.css";
import EditorialPortfolio from "./EditorialPortfolio";
import EditorTheme from "./editorTheme.css";

const container = document.getElementById("root");
if (!container) throw new Error("Missing root container.");
const root = createRoot(container);
root.render(<EditorialPortfolio />);