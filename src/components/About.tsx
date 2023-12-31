import { useState } from 'react';
import PageHeader from './PageHeader';

function About() {
  document.title = 'About | RCS Photography';
  const [ready, setReady] = useState<boolean>();
  
  return <div id="about">
    <div className="container">
      <PageHeader title="About" subtitle={"by Raphael Corrêa"}/>
      <div className="body">
        <p>This is a portfolio for my photography, one of my biggest hobbies once upon a time.</p>
        <p>I shoot mostly in manual and record in raw format. I also use CaptureOne to edit my work.</p>
        <p>This website was written in React with Typescript and is hosted on AWS.</p>
        <p>The source code is on <a href='https://www.github.com/raphael-correa-ng/rcsphoto' target='_blank' rel='noreferrer'>GitHub</a>.</p>
        <p>Thanks for viewing!</p>
        <div className="image-container">
          <img 
            src="me.jpg"
            alt=""
            className={ready ? 'image-ready' : 'image-not-ready'} 
            onLoad={() => setReady(true)}/>
        </div>
      </div>
    </div>
  </div>;
}

export default About;