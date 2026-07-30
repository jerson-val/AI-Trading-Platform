'use client'

import { useState } from "react";

import { useDrawingStore } from "@/src/store/drawing.store";

export default function TextEditorOverlay() {

    const editor = useDrawingStore(s => s.textEditor);

    const setTextEditor =
        useDrawingStore(s => s.setTextEditor);

    const addDrawing =
        useDrawingStore(s => s.addDrawing);

    const [text, setText] =
        useState("");

    if (!editor)
        return null;

    const save = () => {

        if (!text.trim()) {

            setTextEditor(null);

            setText("");

            return;

        }

        addDrawing({

            id: crypto.randomUUID(),

            type: "text",

            point: editor.point,

            text,

            color: "#ffffff",

            fontSize: 16,

        });

        setText("");

        setTextEditor(null);

    };

    return (

        <input

            autoFocus

            value={text}

            onChange={e =>
                setText(e.target.value)
            }

            onBlur={save}

            onKeyDown={event => {

                if (event.key === "Enter")
                    save();

                if (event.key === "Escape") {

                    setText("");

                    setTextEditor(null);

                }

            }}

            className="
                absolute
                z-50
                rounded
                border
                border-blue-500
                bg-[#111827]
                px-2
                py-1
                text-sm
                text-white
                outline-none
            "

            style={{

                left: editor.screen.x,

                top: editor.screen.y,

            }}

        />

    );

}