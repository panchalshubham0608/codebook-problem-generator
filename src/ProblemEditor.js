import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { getCodeString } from 'rehype-rewrite';
import katex from 'katex';
import 'katex/dist/katex.css';

export default function ProblemEditor(props) {
    const { description, setDescription } = props;
    return (
        <MDEditor
            value={description}
            onChange={setDescription}
            previewOptions={{
                components: {
                    code: ({ inline, children = [], className, ...props }) => {
                        const txt = children[0] || '';
                        if (inline) {
                            if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                                const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                                    throwOnError: false,
                                });
                                return <code dangerouslySetInnerHTML={{ __html: html }} />;
                            }
                            return <code>{txt}</code>;
                        }
                        const code = props.node && props.node.children ? getCodeString(props.node.children) : txt;
                        if (
                            typeof code === 'string' &&
                            typeof className === 'string' &&
                            /^language-katex/.test(className.toLocaleLowerCase())
                        ) {
                            const html = katex.renderToString(code, {
                                throwOnError: false,
                            });
                            return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                        }
                        return <code className={String(className)}>{txt}</code>;
                    },
                },
            }}
        />
    );
}