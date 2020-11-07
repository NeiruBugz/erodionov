import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { ArticleProps } from '../../types';

const Article = ({ body }: ArticleProps) => {
  return (
    <article>
      <MarkdownPreview source={body} />
    </article>
  );
};

export { Article };