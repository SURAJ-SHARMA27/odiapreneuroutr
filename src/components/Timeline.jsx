import React, { useEffect } from 'react'
import  "../components/stylecss/Timeline.css";
import { initializeTimeline } from '../components/stylecss/Timeline.js';
const Timeline = () => {
    useEffect(() => {
        initializeTimeline(); // Call the initialization function
      }, []);
  return (
    <div>
         <section class="timeline mb-5 mt-5">
            <h1 id="timeline_heading" className="glow">Timeline</h1>
           <ul>
              
               <li>
                   <div>
                       <time>First</time>
                       <div class="discovery">
                           <h1>Orientation</h1>
                           <p>Day</p>
                       </div>
                       <div class="scientists">
                           <h1>23rd December,</h1>
                           <span>2023</span>
                       </div>
                   </div>
               </li>
               <li>
                <div>
                    <time>Second</time>
                    <div class="discovery">
                        <h1>Registration</h1>
                        <p>Open</p>
                    </div>
                    <div class="scientists">
                        <h1>23rd December,</h1>
                        <span>2022</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <time>Third</time>
                    <div class="discovery">
                        <h1>Registration</h1>
                        <p>Close</p>
                    </div>
                    <div class="scientists">
                        <h1>2nd week of </h1>
                        <span>January, 2023</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <time>Fourth</time>
                    <div class="discovery">
                        <h1>Problem</h1>
                        <p>Statement Finalization</p>
                    </div>
                    <div class="scientists">
                        <h1>3rd week of</h1>
                        <span>January ,2023</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <time>Fifth</time>
                    <div class="discovery">
                        <h1>District Level</h1>
                        <p>Evaluation</p>
                    </div>
                    <div class="scientists">
                    <h1>3rd week of</h1>
                        <span>January ,2023</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <time>Sixth</time>
                    <div class="discovery">
                        <h1>State Level</h1>
                        <p>Evaluation</p>
                    </div>
                    <div class="scientists">
                        <h1>4th week of</h1>
                        <span>January, 2023</span>
                    </div>
                </div>
            </li>
            
           </ul>
       </section>


    </div>
  )
}

export default Timeline