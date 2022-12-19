import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
export default function Home() {
  const [data, setData] = useState({ text: '' });
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai/`, {
          body: JSON.stringify({
            topic: search,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        let data = await res.json();
        const wordsToFilter = [
          'Title:',
          'Introduction:',
          'Body:',
          'Conclusion:',
        ];
        // const filterString = wordsToFilter.join('|');
        // const filterRegX = new RegExp(filterString, 'gi');
        // console.log(filterRegX);
        data.text = String(data.text)
          // .replace(filterRegX, '')
          .replace(/Title: /, 'Title: \t')
          .replace(/Blog Intro: /, 'Blog Intro: \n')
          .replace(/Introduction: /, 'Introduction: \n')
          .replace(/Body: /, 'Body: \n')
          .replace(/Conclusion: /, 'Conclusion: \n');
        setData(data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [search]);
  return (
    <div className={styles.container}>
      <Head>
        <title>GPT-3 App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Blog writer Generator</a>
        </h1>
        <p className={styles.description}>Built with NextJS & GPT-3 API</p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Enter Topic:</h3>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" onClick={() => setSearch(query)}>
              Generate
            </button>
            <h4>Generated article</h4>
            {isLoading ? (
              <div>Loading ...</div>
            ) : (
              <div className={styles.response}>
                <div className={styles.response_header}>
                  <h4>Topic: {data.topic}</h4>
                </div>
                <div className={styles.response_body}>
                  <span className={styles.span}>{data.text}</span>
                </div>
                {/* <div className={styles.response_auth}>
                  <h4>Author: {data.model}</h4>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}