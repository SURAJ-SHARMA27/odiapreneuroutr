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
                           <h1> After 24th November 2023</h1>
                           
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
                        <h1>5th January,</h1>
                        <span>2024</span>
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
                    <h1>Coming</h1>
                        <span>Soon</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <time>Fourth</time>
                    <div class="discovery">
                        <h1>State Level Competition</h1>
                    </div>
                    <div class="scientists">
                    <h1>Coming</h1>
                        <span>Soon</span>
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