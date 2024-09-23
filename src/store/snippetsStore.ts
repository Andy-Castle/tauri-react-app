import { create } from "zustand";

interface Snippet {
  name: string;
  code: string | null;
}

interface snippetState {
  snippetsNames: string[];
  selectedSnippet: Snippet | null;
  addSnippetName: (name: string) => void;
  setSnippetsNames: (names: string[]) => void;
  setSelectedSnippet: (snippet: Snippet | null) => void;
  removeSnippet: (name: string) => void;
}

export const useSnippetsStore = create<snippetState>((set) => ({
  snippetsNames: [],
  selectedSnippet: null,
  addSnippetName: (name) =>
    set((state) => ({ snippetsNames: [...state.snippetsNames, name] })),
  setSnippetsNames: (names) => set({ snippetsNames: names }),
  setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
  removeSnippet: (name) =>
    set((state) => ({
      snippetsNames: state.snippetsNames.filter(
        (n) => n !== name
      ),
    })),
}));
