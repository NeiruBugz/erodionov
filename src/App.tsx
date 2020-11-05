import React, {useEffect, useState} from 'react';
import './App.css';

import {get, getRawContent} from './api/api';

import {Article} from './components/article/article';

type Lesson = {
	size: number;
	download_url: string;
	git_url: string;
	html_url: string;
	name: string;
	path: string;
	sha: string;
	type: string;
	url: string;
};

type Content = {
	markdown: string;
	title: string;
	subTitle: string;
	id: string;
	previous: string[];
	stage: number;
	stageId: string;
};

function App() {

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

	const onLinkClick = async () => {
		const c = await getRawContent('verstka');
		setContent(JSON.parse(decode(c.content)));
		setActiveList(p => !p);
	};

	return (
		<>
			<section className="header">
				<h1>Курсы Родионова</h1>
			</section>
			<div className="App">
				{markup.length !== 0
				&& frontend.length !== 0
				&&
        <>
					{!isActiveList ?
						<>
							<section>
								<h3>Верстка</h3>
								<ol>
									{markup.map(({sha, name, html_url, git_url}) =>
										<li key={sha} onClick={onLinkClick}>{name.slice(3, name.length - 4)}</li>)}
								</ol>
							</section>
							<section>
								<h3>Фронтенд (<code>React</code>)</h3>
								<ol>
									{frontend.map(({sha, name, html_url}) => <a href={html_url} key={sha} target='_blank'
									                                            rel='noreferrer'>
										<li>{name.slice(3, name.length - 3)}</li>
									</a>)}
								</ol>
							</section>
						</>
						: <>{content !== undefined &&
            <Article title={content.title} sub={content.subTitle} body={content.markdown}/>}</>
					}
        </>}
			</div>
		</>
	);
}

export default App;
