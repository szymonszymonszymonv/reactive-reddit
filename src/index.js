import React from 'react';
import ReactDOM from 'react-dom';
import '@coreui/coreui/dist/css/coreui.min.css'
import './index.css';
import './components/styles/Comment.css'
import './components/styles/Home.css'
import './components/styles/Main.css'
import './components/styles/Header.css'
import './components/styles/PostCard.css'
import './components/styles/PostComments.css'
import './components/styles/PostDetails.css'
import './components/styles/Posts.css'
import './components/styles/SubmissionScore.css'
import './components/styles/SubredditList.css'

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
