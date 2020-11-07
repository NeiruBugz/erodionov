import React, { useEffect, useState } from 'react';

import { Article, List, Menu } from './components';

import { get, getRawContent } from './api';
import { Lesson, Content } from './types';

import './App.css';

const App = () => {

  const [markup, setMarkup] = useState<Lesson[]>([]);
  const [frontend, setFrontend] = useState<Lesson[]>([]);
  const [isActiveList, setActiveList] = useState(false);
  const [article, setArticle] = useState<Content>();
  const [isFrontendOpen, setFrontendOpen] = useState(false);
  const [isMarkupOpen, setMarkupOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const r = await get('verstka');
      setMarkup(r.slice(0, r.length - 1));
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const r = await get('react');
      setFrontend(r.slice(0, r.length - 1));
    };

    fetch();
  }, []);

  const decode = (str: string) => {
    return decodeURIComponent(atob(str).split('').map(c => `%${(`00${  c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
  };

  const onLinkClick = async (url: string) => {
    const { name, content } = await getRawContent(url);
    const decoded = decode(content);
    const c: Content = {
      markdown: decoded,
      title: name.slice(3, name.length - 3),
    };
    setArticle(c);
    setActiveList(true);
    setFrontendOpen(false);
    setMarkupOpen(false);
  };

  const reset = () => {
    setActiveList(false);
    setMarkupOpen(false);
    setFrontendOpen(false);
  };

  return (
    <>
      <section className="header">
        <h1>Курсы Родионова</h1>
        {isActiveList &&
        <>
          <button type="button" onClick={reset}>На главную</button>
          <button type="button" onClick={() => setMarkupOpen(p => !p)}>Верстка</button>
          <button type="button" onClick={() => setFrontendOpen(p => !p)}>Фронтенд</button>
        </>}
        {isMarkupOpen && <Menu><List items={markup} title="Верстка" onClick={onLinkClick} /></Menu>}
        {isFrontendOpen && <Menu><List items={frontend} title="Фронтенд" onClick={onLinkClick} /></Menu>}
      </section>
      <div className="App">
        {markup && frontend && !isActiveList
          ?
            <>
              <List items={markup} title="Верстка" onClick={onLinkClick} />
              <List items={frontend} title="Фронтенд" onClick={onLinkClick} />
            </>
          :
            <>
              {article &&
              <>
                <Article
                  body={article?.markdown}
                  title={article?.title}
                  sub={article?.subTitle}
                />
              </>}
            </>}
      </div>
    </>
  );
};

export  { App };
