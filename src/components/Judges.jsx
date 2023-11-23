import React, { useState } from 'react';
import './Judges.css';

const Judges = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <h1 className='glow' style={{textAlign:"center",fontSize:"50px",marginTop:"80px"}}>FAQ</h1>
      <section>
        {data.map((item, index) => (
          <div className={`accordion ${activeIndex === index ? 'active' : ''}`} key={index}>
            <div className="question" onClick={() => handleAccordionClick(index)}>
              <h3>{item.question}</h3>
            </div>
            <div className="answer" style={{ height: activeIndex === index ? `${item.height+20}px` : '0px' }}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const data = [
  {
    question: 'What is a hackathon?',
    answer:
      "A hackathon is an invention marathon where you can work with people around the globe to build a project related to technology! It isn't about hacking into a system, it's instead about hacking something together and learning a great deal in the process.",
    height: 130,
  },
  {
    question: 'Can we work on old or ongoing project?',
    answer:
      'No, you have to start from scratch. You can use open source libraries and frameworks.',
    height: 70,
  },
  {
    question: 'How many members do we need in a team?',
    answer:
      'Submissions must be made as a team with a minimum of 2 members and a maximum of 4 members. Solo submissions are not allowed.',
    height: 80,
  },
  {
    question: 'When can I start working on my project?',
    answer:
      'As soon as the hackathon opens on November 24. To keep the playing field fair, we don’t allow teams to begin building prior to the start of the hackathon. If your project is an upgrade to an existing project, please check with us beforehand.',
    height: 130,
  },
];

export default Judges;
