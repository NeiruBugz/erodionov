import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const Article = ({ body, sub, title }: { body: string, title: string, sub: string }) => {
  return(
    <>
      <div>Article</div>
      <article>
        <h2>{title}</h2>
        <h3>{sub}</h3>
        <MarkdownPreview source={body}/>
      </article>
    </>
  )
};

export { Article };