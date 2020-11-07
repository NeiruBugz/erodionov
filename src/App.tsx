import React, { useEffect, useState } from 'react';
import './App.css';

import { get, getRawContent } from './api/api';

import { Article, List } from './components';

import { Lesson, Content } from './types';

const App = () => {

  const [markup, setMarkup] = useState<Lesson[]>([]);
  const [frontend, setFrontend] = useState<Lesson[]>([]);
  const [isActiveList, setActiveList] = useState(false);
  const [article, setArticle] = useState<Content>();

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
    setActiveList(p => !p);
  };

  return (
    <>
      <section className="header">
        {isActiveList && <button type="button" onClick={() => setActiveList(false)}>К меню</button>}
        <h1>Курсы Родионова</h1>
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
              {article && <Article
                body={article?.markdown}
                title={article?.title}
                sub={article?.subTitle}
              />}
            </>}
      </div>
    </>
  );
};

export  { App };
