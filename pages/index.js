import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const Home = () => {
  // Create state property
  const [input, setInput] = useState('');
  const [img, setImg] = useState('');
  const onChange = (event) => {
    setInput(event.target.value);
  };

  const generateAction = async () => {
    console.log('Generating...');	
    // Add the fetch request
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();

    // If model still loading, drop that retry time
    if (response.status === 503) {
      console.log('Model is loading still :(.')
      return;
    }

    // If another error, drop error
    if (!response.ok) {
      console.log(`Error: ${data.error}`);
      return;
    }
    // Set image data into state property
    setImg(data.image);

  };

  return (
    <div className="root">
      <Head>
        <title>AI Avatar Generator | Yann GOMEZ</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Yann Gomez picture generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>description of your generator</h2>
          </div>
          {/* Add prompt container here */}
          <div className="prompt-container">
            <input className="prompt-box" value={input} onChange={onChange}/>
            <div className="prompt-buttons">
              <a className="generate-button" onClick={generateAction}>
                <div className="generate">
                  <p>Generate</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.linkedin.com/in/yann-gomez2000/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>build by Yann Gomez</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
