import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import './App.css'

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const extensionId = chrome.runtime.id;
    const port = chrome.runtime.connect(extensionId);

    port.onMessage.addListener((res) => {
      setBookmarks(res.bookmarks)
    });
  }, []);

  return (
    <div>
      <h1>Bookmarks 🚀</h1>
      <div class="Grid">
        {bookmarks.map(b => (
          <div class="Grid-cell">
            <a href={b.url} class="Link">
              <div class="Link-image">
                {b.image && <img src={b.image} class="Link-image" />}
              </div>
              <div class="Link-title">{b.title}</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

const mountNode = document.getElementById('app-root')
render(<App />, mountNode, mountNode.lastChild);
