import { useSnippetsStore } from "../store/snippetsStore";
import { twMerge } from "tailwind-merge";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import toast from "react-hot-toast";
import { FiTrash, FiX } from "react-icons/fi";

interface Props {
  snippetName: string;
}

function SnippetItem({ snippetName }: Props) {
  const setSelectedSnippet = useSnippetsStore((state) => state.setSelectedSnippet);

  const selectedSnippet = useSnippetsStore((state) => state.selectedSnippet);

  const removeSnippetName = useSnippetsStore((state) => state.removeSnippet);

  const handleDelete = async (snippetName: string) => {
    const accept = await window.confirm(
      "Are you sure you want to delete this snippet?"
    );
    if (!accept) return;

    const destopPath = await desktopDir();
    const filePath = await join(destopPath, "taurifiles", `${snippetName}.js`);
    await removeFile(filePath);
    removeSnippetName(snippetName);

    toast.success("Snippet deleted", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: "#202020",
        color: "#fff",
      },
    });
  };

  return (
    <div
      className={twMerge(
        "py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer flex justify-between",
        selectedSnippet?.name === snippetName ? "bg-sky-500" : ""
      )}
      onClick={async () => {
        const desktopPath = await desktopDir();
        const filePath = await join(
          desktopPath,
          "taurifiles",
          `${snippetName}.js`
        );

        const snippet = await readTextFile(filePath);

        setSelectedSnippet({ name: snippetName, code: snippet });
      }}>
      <h1>{snippetName}</h1>

      {selectedSnippet?.name === snippetName && (
        <div className="flex gap-2 items-center justify-center">
          <FiTrash
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(snippetName);
            }}
            className="text-neutral-500"
          />

          <FiX
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSnippet(null);
            }}
            className="text-neutral-500"
          />
        </div>
      )}
    </div>
  );
}

export default SnippetItem;
