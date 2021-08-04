import React, { useEffect, useState } from 'react';
import './AppReact1.css';

const quotes = [
  {
    text: 'Strive not to be a success, but rather to be of value.',
    author: 'Albert Einstein',
  },
  {
    text: 'A person who never made a mistake never tried anything new.',
    author: 'Albert Einstein',
  },

  {
    text: 'You can never cross the ocean until you have the courage to lose sight of the shore.',
    author: 'Christopher Columbus',
  },

  {
    text: 'I have learned over the years that when one’s mind is made up, this diminishes fear.',
    author: 'Rosa Parks',
  },

  {
    text: 'Everything has beauty, but not everyone can see.',
    author: 'Confucius',
  },
];

export default function AppReact1() {
  const [quote, setQuote] = useState({
    text: '',
    author: '',
  });

  function randomQuotes() {
    let num = getRandomInt(0, 4);
    setQuote(quotes[num]);
  }

  useEffect(() => {
    randomQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div id='quote-box'>
      <h2 id='text'>{quote.text}</h2>
      <p id='author'>- {quote.author}</p>
      <div className='box'>
        <a
          target='_top'
          title='Tweet this quote!'
          href={
            `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="` +
            quote.text +
            ` ` +
            quote.author
          }
          id='tweet-quote'
        >
          Tweet
        </a>
        <button onClick={randomQuotes} type='button' id='new-quote'>
          New Quote
        </button>
      </div>
    </div>
  );
}
