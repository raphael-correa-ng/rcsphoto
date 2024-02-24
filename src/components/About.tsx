import { useState } from 'react';
import PageHeader from './PageHeader';

const images = ['me1.JPG', 'me2.JPG', 'me3.JPG', 'me4.JPG'];

function About() {
  document.title = 'About | RCS Photography';

  const [imageIsReady, setImageIsReady] = useState<boolean[]>([]);

  const setImageIsReadyToTrue = (index) => {
    const newReady = [...imageIsReady];
    newReady[index] = true;
    setImageIsReady(newReady);
  }

  return <div id="about">
    <div className="container">
      <PageHeader title="About" subtitle={"by Raphael Corrêa"}/>
      <div className="body">
        <p>This is a portfolio for my photography, one of my biggest hobbies once upon a time.</p>
        <p>I shoot mostly in manual and record in raw format. I also use CaptureOne to edit my work.</p>
        <p>This website was written in React with Typescript and is hosted on AWS and IBM Cloud.</p>
        <p>The source code is on <a href='https://www.github.com/raphael-correa-ng/rcsphoto' target='_blank' rel='noreferrer'>GitHub</a>.</p>
        <p>Thanks for viewing!</p>
        <div className="images-container">
          {
            images.map((image, index) =>
              <img
                key={index}
                src={image}
                alt=""
                className={imageIsReady[index] ? 'image-ready' : 'image-not-ready'}
                onLoad={() => setImageIsReadyToTrue(index)}/>
            )
          }
        </div>
      </div>
    </div>
  </div>;
}

export default About;