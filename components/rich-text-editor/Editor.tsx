"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";

export function RichTextEditor({ field }: { field: any }) {
  const [mounted, setMounted] = useState(false);

  // ✅ Ensure this code only runs on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Fix JSON parse error
  let content;
  try {
    content =
      typeof field.value === "string"
        ? JSON.parse(field.value)
        : field.value;
  } catch (error) {
    console.warn("Invalid JSON passed to RichTextEditor:", field.value);
    content = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: field.value ?? "" }],
        },
      ],
    };
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none",
      },
    },
    content,
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    // ✅ Important: required to fix hydration issues
    immediatelyRender: false,
  });

  // ✅ Fix hydration mismatch by not rendering until after mount
  if (!mounted || !editor) return null;

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
