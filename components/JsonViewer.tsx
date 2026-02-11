"use client";

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('json', json);

interface JsonViewerProps {
    data: object;
}

export default function JsonViewer({ data }: JsonViewerProps) {
    return (
        /* FIX: text-[10px] for mobile makes text small enough to fit.
           FIX: overflow-hidden ensures the container doesn't expand.
        */
        <div className="rounded-md overflow-hidden text-[10px] leading-relaxed sm:text-xs md:text-sm max-w-full">
            <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '0.75rem', // Tighter padding on mobile
                    background: 'transparent',
                    fontSize: 'inherit',
                    lineHeight: '1.6',
                }}
                wrapLines={true}
                /* FIX: wrapLongLines={true} is the "secret sauce".
                   It forces the long URLs and strings to wrap to the next line
                   so the user never has to scroll left or right.
                */
                wrapLongLines={true}
            >
                {JSON.stringify(data, null, 2)}
            </SyntaxHighlighter>
        </div>
    );
}