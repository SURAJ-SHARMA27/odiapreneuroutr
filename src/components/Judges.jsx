import React, { useState, useEffect } from 'react';
import './Judges.css';

const Judges = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const updateHeight = () => {
      const elements = document.querySelectorAll('.answer');
      elements.forEach((element, index) => {
        element.style.height = activeIndex === index ? `${data[index].height + 20}px` : '0px';
      });
    };

    updateHeight();

    // Event listener for window resize
    window.addEventListener('resize', updateHeight);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [activeIndex]);

  return (
    <div>
      <h1 className='glow' style={{ textAlign: "center", fontSize: "50px", marginTop: "80px" }}>FAQ</h1>
      <section>
        {data.map((item, index) => (
          <div className={`accordion ${activeIndex === index ? 'active' : ''}`} key={index}>
            <div className="question" onClick={() => handleAccordionClick(index)}>
              <h3>{item.question}</h3>
            </div>
            <div className="answer">
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
    answer: "A hackathon is an invention marathon where you can work with people around the globe to build a project related to technology! It isn't about hacking into a system, it's instead about hacking something together and learning a great deal in the process.",
    height: 200,
  },
  {
    question: 'Can we work on old or ongoing project?',
    answer: 'No, you have to start from scratch. You can use open source libraries and frameworks.',
    height: 70,
  },
  {
    question: 'How many members do we need in a team?',
    answer: 'Submissions can be made either as a solo submission or as a team with a maximum of three members, including the team leader and two additional members. The minimum team size is one member.',
    height: 145,
  },
  {
    question: 'When can I start working on my project?',
    answer: 'As soon as the hackathon opens on November 24. To keep the playing field fair, we don’t allow teams to begin building prior to the start of the hackathon. If your project is an upgrade to an existing project, please check with us beforehand.',
    height: 200,
  },
  {
    question: 'How to register for Odiapreneur 2.0?',
    answer: 'Registration of students can only be done by the school Admin. Students need to submit the details to the school admin. To get the detailed idea of registration what the Youtube video. Link : Coming soom',
    height: 200,
  },
  {
    question: 'How to contact in case of any issue?',
    answer: 'In the contact Us section of the website the is a button of helpdesk by clicking on it you will see three email ids you can mail any of the three email ids at any point of time stating the issue and can expect a timlet response as the maintainers of the website are always active',
    height: 200,
  },
];

export default Judges;
