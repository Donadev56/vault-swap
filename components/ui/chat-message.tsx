import React from "react";
import ReactMarkdown, { type Components } from "react-markdown"; // required
import remarkGfm from "remark-gfm"; //required
import remarkBreaks from "remark-breaks"; // required
import rehypeSanitize from "rehype-sanitize"; // required

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import styled from "styled-components";

export interface CodeProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "code";

  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return !inline && match ? (
    <div className={"code-container"}>
      <div className={"code-header"}>
        <span className={"code-language"}>{language}</span>
        <button className={"copy-button"} onClick={handleCopy}>
          {copied ? <IconCopyCheck /> : <IconCopy />}
        </button>
      </div>
      <SyntaxHighlighter
        customStyle={{
          borderRadius: "7px",
          backgroundColor: "#171717",
          fontSize: "14px",
        }}
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const components: Partial<Components> = {
  code: CodeBlock as any,
};

export interface MessageElementType {
  text: string;
  style?: React.CSSProperties;
}

const MessageElement = ({ text, style }: MessageElementType) => {
  return (
    <MessageElementStyle>
      <div
        id="TextElement"
        style={style}
        className={` flex overflow-x-scroll w-max max-w-[85%] flex-col gap-2 rounded-lg  text-sm`}
      >
        <div className={"md"}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeSanitize]}
            components={components}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </MessageElementStyle>
  );
};

export default MessageElement;

const MessageElementStyle = styled.div`
  .code-container {
    position: relative;
    border-radius: 5px;
    margin: 1em 0;
    overflow: hidden;
    font-family: "Fira Code", monospace;
  }

  .code-header {
    margin-bottom: -10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #323232;
    color: #f8f8f2;
    padding: 0.5em 1em;
    font-size: 0.7em;
  }

  .code-language {
    font-weight: bold;
  }

  .copy-button {
    background: transparent;
    border: none;
    color: #f8f8f2;
    padding: 0.3em 0.7em;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.8em;
    transition: background 0.2s;
  }

  .copy-button:hover {
    background-color: #262626;
  }

  .code-container pre {
    margin: 0;
    padding: 1em;
    overflow-x: auto;
  }

  .markdown {
    color: #e0e0e0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    border-radius: 8px;
  }

  .markdown h1 {
    font-size: 2em;
    border-bottom: 2px solid #444;
    padding-bottom: 0.3em;
    color: #ff79c6;
  }

  .markdown h2 {
    font-size: 1.75em;
    border-bottom: 1px solid #444;
    padding-bottom: 0.2em;
    color: #bd93f9;
  }

  .markdown h3 {
    font-size: 1.5em;
    color: #50fa7b;
  }

  .markdown p {
    font-size: 16px;
    margin-bottom: 1em;
    color: #ffffffdb;
  }

  .markdown blockquote {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid #6272a4;
    background-color: #282a36;
    color: #f1fa8c;
    font-style: italic;
  }

  .markdown ul,
  .markdown ol {
    margin: 1em 0;
    padding-left: 2em;
    color: #f8f8f2;
  }

  .markdown li {
    margin-bottom: 0.5em;
  }

  .markdown a {
    text-decoration: underline;
  }

  .markdown a:hover {
    text-decoration: underline;
  }

  .markdown code {
    padding: 0.1em 0.2em;
    border-radius: 4px;
  }

  .markdown hr {
    border: none;
    height: 1px;
    background-color: #444;
    margin: 2em 0;
  }

  .markdown img {
    max-width: 100%;
    border-radius: 8px;
  }

  .markdown ul {
    list-style-type: none;
    padding-left: 0;
  }

  .markdown ul li {
    position: relative;
    padding-left: 1.5em;
    margin-bottom: 0.5em;
  }

  .markdown ul li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #50fa7b;
    font-size: 1.2em;
    line-height: 1;
  }

  .markdown ol {
    list-style: none;
    counter-reset: item;
    padding-left: 0;
  }

  .markdown ol li {
    position: relative;
    padding-left: 1.5em;
    margin-bottom: 0.5em;
  }

  .markdown ol li::before {
    counter-increment: item;
    content: counter(item) ".";
    position: absolute;
    left: 0;
    color: #ffb86c;
    font-weight: bold;
  }

  .markdown blockquote {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid #6272a4;
    background-color: #282a36;
    color: #f1fa8c;
    font-style: italic;
    border-radius: 4px;
  }
  /* Styles modernes pour les tables */

  .markdown table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    background-color: transparent;
    overflow: hidden;
  }

  .markdown th,
  .markdown td {
    padding: 0.75em;

    border: 1px solid #373737;
    text-align: left;
    color: #f8f8f2;
  }

  .markdown th {
    background-color: #282828;
    color: #ffffff;
    font-weight: bold;
    text-transform: uppercase;
  }

  .markdown tr:nth-child(even) {
    background-color: transparent;
  }

  .markdown tr:hover {
    background-color: #2b2b2b;
  }

  .md,
  img {
    padding-inline: 10px;
    padding-block: 10px;
    border-radius: 25px;
  }
`;
