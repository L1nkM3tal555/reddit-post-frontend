import './App.css';
import Post from './components/post/Post';
import SubRedditInfo from './components/subredditInfo/SubRedditInfo';
import { React, useEffect,useState } from 'react';
import { IntlProvider, FormattedMessage } from "react-intl";



function loadMessages(locale) {
  switch (locale) {
    case "en":
      return import("./lang/en.json");
    case "es":
      return import("./lang/es.json");
    default:
      return import("./lang/en.json");
  }
}

function App() {
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    loadMessages(locale).then((data) => setMessages(data.default));
  }, [locale]);

  return (
    <div className="App">
      <IntlProvider locale={"en"} messages={messages}>
        <header className="App-header">
        <div style={{ textAlign: "center" }}>
          <h3><FormattedMessage id="lang"/></h3>
            <select value={locale} onChange={(e) => setLocale(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
        </div>
        </header>
        <div className='content-container'>
          <Post className='post'/>
          <SubRedditInfo/>
        </div>
        
      </IntlProvider>
    </div>
    
  );
}

export default App;
