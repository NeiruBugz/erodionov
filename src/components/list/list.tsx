import React from 'react';
import {Lesson} from "../../types";

const List = ({items, title, onClick}: { items: Lesson[], title: string, onClick: (name: string) => void }) => {
	return (
		<section>
			<h3>{title}</h3>
			<ol>
				{items.map(({sha, name, html_url, git_url}) =>
					<li key={sha} onClick={() => onClick(name)}>{name.slice(3, name.length - 3)}</li>)}
			</ol>
		</section>
	)
};

export { List };
