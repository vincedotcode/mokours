
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { ToolbarProvider } from "@/components/editor/tooltip-provider";
import EditorToolbar from "@/components/editor/editor-toolbar";

interface TiptapEditorProps {
  onChange: (content: string) => void;
  value: string;
}

const TiptapEditor = ({ onChange, value }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the built-in extensions we'll provide separately
        bold: false,
        italic: false,
        heading: false,
        bulletList: false,
        orderedList: false,
      }),
      Bold,
      Italic,
      Heading.configure({
        levels: [1, 2],
      }),
      BulletList,
      OrderedList,
    ],
    content: value ? JSON.parse(value) : '',
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class: 'min-h-[400px] w-full rounded-md border border-input px-3 py-2 focus-visible:outline-none'
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md p-4">
      <ToolbarProvider editor={editor}>
        <EditorToolbar />
        <EditorContent editor={editor} />
      </ToolbarProvider>
    </div>
  );
};

export default TiptapEditor;
