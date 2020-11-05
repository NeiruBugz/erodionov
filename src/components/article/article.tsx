import React from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownPreview from '@uiw/react-markdown-preview';

const Article = ({ body, sub, title }: { body: string, title: string, sub: string }) => {
  return(
    <>
      <div>Article</div>
      <article>
        <h2>{title}</h2>
        <h3>{sub}</h3>
        {/* <ReactMarkdown>
          {body}
        </ReactMarkdown> */}
        <MarkdownPreview source={body}/>
      </article>
    </>
  )
};

export { Article };