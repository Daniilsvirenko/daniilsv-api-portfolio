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
        // FIX: max-w-full prevents the pre tag from pushing the layout width
        <div className="rounded-md overflow-hidden text-xs md:text-sm max-w-full">
            <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: 'inherit',
                    lineHeight: '1.5',
                }}
                wrapLines={true}
                // FIX: wrapLongLines forces text to stay inside instead of scrolling endlessly
                wrapLongLines={false}
            >
                {JSON.stringify(data, null, 2)}
            </SyntaxHighlighter>
        </div>
    );
}