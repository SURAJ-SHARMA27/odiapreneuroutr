import React, { useEffect } from 'react'
import  "../components/stylecss/Timeline.css";
import { initializeTimeline } from '../components/stylecss/Timeline.js';
const Timeline = () => {
    useEffect(() => {
        initializeTimeline(); // Call the initialization function
      }, []);
  return (
    <div>
         <section class="timeline mb-5 mt-5" >
            <h1 id="timeline_heading" className="glow">Timeline</h1>
           <ul>
              
               <li>
                   <div>
                       <time>First</time>
                       <div class="discovery">
                           <h1>Orientation at School level</h1>
                           
                       </div>
                       <div class="scientists">
                           <h1> By 20th November 2023</h1>
                           
                       </div>
                   </div>
               </li>
            <li>
                <div>
                    <time>Second</time>
                    <div class="discovery">
                        <h1>Registration closes</h1>
                    </div>
                    <div class="scientists">
                        <h1>5th December,</h1>
                        <span>2022</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <time>Third</time>
                    <div class="discovery">
                        <h1>District Level</h1>
                        <p>Competition</p>
                    </div>
                    <div class="scientists">
                        <h1>By 24th December, 2023</h1>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <time>Fourth</time>
                    <div class="discovery">
                        <h1>State Level Compedition</h1>
                    </div>
                    <div class="scientists">
                    <h1>3rd week of</h1>
                        <span>January ,2024</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <time>Fifth</time>
                    <div class="discovery">
                        <h1>Result Declaration</h1>
                    </div>
                    <div class="scientists">
                    <h1>Coming</h1>
                        <span>Soon</span>
                    </div>
                </div>
            </li>
           </ul>
       </section>


    </div>
  )
}

export default Timeline