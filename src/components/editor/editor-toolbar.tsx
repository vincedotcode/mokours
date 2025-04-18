import { useToolbar } from "@/components/editor/tooltip-provider";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2 } from "lucide-react";

const EditorToolbar = () => {
  const { editor } = useToolbar();

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-2">
      <Button
        size="sm"
        variant={editor.isActive("bold") ? "default" : "outline"}
        onClick={() => editor.chain().focus().setBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("italic") ? "default" : "outline"}
        onClick={() => editor.chain().focus().setItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EditorToolbar;
