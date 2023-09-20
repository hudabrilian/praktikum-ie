import { cn } from "@/lib/utils";
import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const extensions = [StarterKit];

export const content = "Type something here...";

export const MenuBar = ({ editor }: { editor: Editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="px-2 py-2 sticky top-8 border border-gray-400 bg-slate-800 rounded-xl mb-4 z-10">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={cn(
                    "btn-editor",
                    editor.isActive("bold") ? "bg-slate-400" : ""
                )}
            >
                bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={cn(
                    "btn-editor",
                    editor.isActive("italic") ? "bg-slate-400" : ""
                )}
            >
                italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={cn(
                    "btn-editor",
                    editor.isActive("strike") ? "bg-slate-400" : ""
                )}
            >
                strike
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={cn(
                    "btn-editor",
                    editor.isActive("code") ? "bg-slate-400" : ""
                )}
            >
                code
            </button>
            <button
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
                className={cn("btn-editor")}
            >
                clear marks
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={cn(
                    "btn-editor",
                    editor.isActive("paragraph") ? "bg-slate-400" : ""
                )}
            >
                paragraph
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={cn(
                    "btn-editor",
                    editor.isActive("heading", { level: 1 })
                        ? "bg-slate-400"
                        : ""
                )}
            >
                h1
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={cn(
                    "btn-editor",
                    editor.isActive("heading", { level: 2 })
                        ? "bg-slate-400"
                        : ""
                )}
            >
                h2
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={cn(
                    "btn-editor",
                    editor.isActive("heading", { level: 3 })
                        ? "bg-slate-400"
                        : ""
                )}
            >
                h3
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={cn(
                    "btn-editor",
                    editor.isActive("heading", { level: 4 })
                        ? "bg-slate-400"
                        : ""
                )}
            >
                h4
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={cn(
                    "btn-editor",
                    editor.isActive("heading", { level: 5 })
                        ? "bg-slate-400"
                        : ""
                )}
            >
                h5
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(
                    "btn-editor",
                    editor.isActive("bulletList", { level: 1 })
                        ? "bg-slate-400"
                        : ""
                )}
            >
                bullet list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(
                    "btn-editor",
                    editor.isActive("orderedList", { level: 1 })
                        ? "bg-slate-400"
                        : ""
                )}
            >
                ordered list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={cn(
                    "btn-editor",
                    editor.isActive("codeBlock", { level: 1 })
                        ? "bg-slate-400"
                        : ""
                )}
            >
                code block
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={cn(
                    "btn-editor",
                    editor.isActive("blockquote", { level: 1 })
                        ? "bg-slate-400"
                        : ""
                )}
            >
                blockquote
            </button>
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={cn("btn-editor")}
            >
                horizontal rule
            </button>
            <button
                onClick={() => editor.chain().focus().setHardBreak().run()}
                className={cn("btn-editor")}
            >
                hard break
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className={cn("btn-editor")}
            >
                undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className={cn("btn-editor")}
            >
                redo
            </button>
        </div>
    );
};

const TipTap = ({ editor }: { editor: Editor }) => {
    return (
        <div>
            {editor.isEditable && <MenuBar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    );
};

export default TipTap;
