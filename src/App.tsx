import React, { useEffect, useState } from 'react';
import './App.css';

import { get, getRawContent } from './api/api';

import { Article, List } from './components';

import { Content, Lesson } from "./types";

const App = () => {

	const [markup, setMarkup] = useState<Lesson[]>([]);
	const [frontend, setFrontend] = useState<Lesson[]>([]);
	const [isActiveList, setActiveList] = useState(false);
	const [content, setContent] = useState<Content>();

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
		return decodeURIComponent(atob(str).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
	}

	const onLinkClick = async (name: string) => {
		const c = await getRawContent('verstka', name);
		setContent(JSON.parse(decode(c.content)));
		setActiveList(p => !p);
	};

	return (
		<>
			<section className="header">
				<h1>Курсы Родионова</h1>
			</section>
			<div className="app">
				{markup.length !== 0
				&& frontend.length !== 0
				&&
        <>
					{!isActiveList ?
						<>
							<List items={markup} title="Верстка" onClick={onLinkClick}/>
							<List items={frontend} title="Фронтенд" onClick={onLinkClick}/>
						</>
						: <>{content !== undefined &&
            <Article title={content.title} sub={content.subTitle} body={content.markdown}/>}</>
					}
        </>}
			</div>
		</>
	);
}

export { App };
