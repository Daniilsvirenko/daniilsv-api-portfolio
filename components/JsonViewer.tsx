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
        <div className="rounded-md overflow-hidden text-sm">
            <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'transparent',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                }}
                wrapLines={true}
            >
                {JSON.stringify(data, null, 2)}
            </SyntaxHighlighter>
        </div>
    );
}
