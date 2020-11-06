export type Lesson = {
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

export type Content = {
	markdown: string;
	title: string;
	subTitle: string;
	id: string;
	previous: string[];
	stage: number;
	stageId: string;
};
