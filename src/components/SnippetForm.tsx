import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useState } from "react";
import { useSnippetsStore } from "../store/snippetsStore";
import { toast } from "react-hot-toast";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");
  const addSnippetName = useSnippetsStore((state) => state.addSnippetName);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        // if (snippetName) {
        // }
        const desktopPath = await desktopDir();
        writeTextFile(`${desktopPath}/taurifiles/${snippetName}.js`, ``);
        setSnippetName("");
        addSnippetName(snippetName);

        toast.success("Snippet Saved", {
          duration: 2000,
          position: "bottom-right",
          style: {
            background: "#202020",
            color: "#fff",
          },
        });
      }}>
      <input
        type="text"
        placeholder="Escribe un snippet"
        className="bg-zinc-900 w-full border-none outline-none p-4"
        onChange={(e) => setSnippetName(e.target.value)}
        value={snippetName}
      />
      <button className="hidden">Save</button>
    </form>
  );
}

export default SnippetForm;
