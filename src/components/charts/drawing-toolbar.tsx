'use client'

import {
    MousePointer2,
    Slash,
    Square,
    Minus,
    ArrowUpRight,
    Type,
    Trash2,
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { useDrawingStore } from "@/src/store/drawing.store";

const TOOLS = [
    {
        id: "none",
        icon: MousePointer2,
        label: "Pointer",
    },
    {
        id: "trendline",
        icon: Slash,
        label: "Trend Line",
    },
    {
        id: "rectangle",
        icon: Square,
        label: "Rectangle",
    },
    {
        id: "horizontal",
        icon: Minus,
        label: "Horizontal Line",
    },
    {
        id: "arrow",
        icon: ArrowUpRight,
        label: "Arrow",
    },
    {
        id: "text",
        icon: Type,
        label: "Text",
    },
];

export default function DrawingToolbar() {
    const mode = useDrawingStore((s) => s.mode);
    const setMode = useDrawingStore((s) => s.setMode);
    const clear = useDrawingStore((s) => s.setDrawings);

    const handleClear = () => clear([]);

    return (
        <TooltipProvider>
            <div
                className="
                    self-start
                    flex
                    w-14
                    flex-shrink-0
                    flex-col
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-700/70
                    bg-slate-900/90
                    p-3
                    shadow-xl
                    shadow-black/40
                    backdrop-blur-md
                "
            >
                {TOOLS.map((tool) => {
                    const Icon = tool.icon;
                    const active = mode === tool.id;

                    return (
                        <Tooltip key={tool.id}>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => setMode(tool.id as any)}
                                    className={`
                                        group
                                        relative
                                        flex
                                        items-center
                                        justify-center
                                        p-1
                                        transition-all
                                        duration-150
                                        ${
                                            active
                                                ? `
                                                    rounded-full
                                                    bg-blue-500
                                                    text-white
                                                    shadow-md
                                                    shadow-blue-500/30
                                                    scale-105
                                                `
                                                : `
                                                    text-slate-400
                                                    hover:bg-slate-800
                                                    hover:text-white
                                                    active:scale-95
                                                `
                                        }
                                    `}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={2}
                                    />
                                </button>
                            </TooltipTrigger>

                            <TooltipContent side="right">
                                <p>{tool.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}

                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={handleClear}
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                text-red-400
                                transition-all
                                duration-150
                                hover:bg-red-500/15
                                hover:text-red-300
                                active:scale-95
                            "
                        >
                            <Trash2
                                size={18}
                                strokeWidth={2}
                            />
                        </button>
                    </TooltipTrigger>

                    <TooltipContent side="right">
                        <p>Clear drawings</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
}