const baseUrl = 'https://api.github.com/repos/NeiruBugz/kurs-kurs-kurs/contents/';

const markup = 'verstka';

const frontend = 'react';

const get = async (type: string) => {
  const response = await fetch(
    `${baseUrl}/${type === 'verstka' ? markup : frontend}`,
    {
      method: 'GET',
    },
  );

  return response.json();
};

const getRawContent = async (url: string) => {
  const response = await fetch(
    url,
    {
      method: 'GET',
    },
  );

  return response.json();
};

export { get, getRawContent };
