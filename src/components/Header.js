import React from 'react';
import myProfile from '../assets/img/me.jpg';

const Header = () => (
  <div className="header">
    <div className="align-self-center mr-5">
      <img src={myProfile} className="rounded-circle" />
    </div>
    <div className="align-self-center">
      <h1>
        <span className="mr-2">Jakub Pomykała</span> 🏝👨‍💻🇵🇱
      </h1>
      <a
        href="https://twitter.com/jakub_pomykala?ref_src=twsrc%5Etfw"
        className="twitter-follow-button"
        data-show-count="false"
      >
        Follow @jakub_pomykala
      </a>
      <div className="px-1 d-inline-block" />
      <a
        className="github-button"
        href="https://github.com/jpomykala"
        aria-label="Follow @jpomykala on GitHub"
      >
        Follow @jpomykala
      </a>
      <p className="mt-3">
        When I was in high school I launched my first Android application, which
        was downloaded over 3&nbsp;000&nbsp;000&nbsp;times! Now I'm bootstrapping my &nbsp;
        <a
          href="https://jpomykala.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          own projects
        </a>
        .
      </p>
    </div>
  </div>
);

export default Header;
