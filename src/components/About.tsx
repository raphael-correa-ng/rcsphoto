import { useState } from 'react';
import PageHeader from './PageHeader';

const imagesOfMe = ['me1.JPG', 'me2.JPG', 'me3.JPG', 'me4.JPG']
    .map(src => ({ src, ready: false }));

function About() {
  document.title = 'About | RCS Photography';

  const [images, setImages] = useState(imagesOfMe);

  const setImageReady = (index) => {
    const newImages = [...images];
    newImages[index].ready = true;
    setImages(newImages);
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
                src={image.src}
                alt=""
                className={image.ready ? 'image-ready' : 'image-not-ready'}
                onLoad={() => setImageReady(index)}/>
            )
          }
        </div>
      </div>
    </div>
  </div>;
}

export default About;