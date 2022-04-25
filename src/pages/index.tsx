import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';
import { useMemo, useState } from 'react';


const fetcher = (query: any) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ query, name: 'ada' })
  })
    .then((res) => res.json())
    .then((json) => json.data);

const Home: NextPage = () => {

  const [input, setInput] = useState('');
  const [name, setName] = useState('');


  const qls = useMemo(() => `{
  getUser(name:"${name}") {
    id
    avatar_url
    login
  }
}`, [name]);

  const { data, error } = useSWR(name ? () => qls : null, fetcher);

  const loading = data === undefined && !error && name;


  const onFetch = () => {
    setName(input);

  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Servers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>


      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>get github user:</p>
          <input
            placeholder="type username..." type="text" value={input} onInput={(e: any) => setInput(e.target?.value)}
          />
          <button onClick={onFetch}>fetch</button>
        </div>


        {
          loading && <p>loading...</p>
        }
        <pre>
          {
            JSON.stringify(data, null, 2)
          }
        </pre>


      </div>

    </div>
  );
};

export default Home;