import { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetsStore } from "../store/snippetsStore";
import SnippetItem from "./SnippetItem";

function SnippetList() {
  const setSnippetsNames = useSnippetsStore((state) => state.setSnippetsNames);
  const snippetsNames = useSnippetsStore((state) => state.snippetsNames);

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const result = await readDir(`${desktopPath}/taurifiles`);
      const fileNames = result.map((file) => file.name!.split(".")[0]);
      setSnippetsNames(fileNames);
    }
    loadFiles();
  }, []);

  return (
    <div>
      {snippetsNames.map((snippetName) => (
        <SnippetItem snippetName={snippetName} key={snippetName} />
      ))}
    </div>
  );
}

export default SnippetList;
