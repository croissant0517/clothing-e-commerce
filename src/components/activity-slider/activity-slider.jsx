import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.utils";

import "./activity-slider.scss";

const ActivitySlider = () => {
  const [ activitySliderInfo, setActivitySliderInfo ] = useState([]);
  const [ currentSliderIndex, setCurrentSliderIndex ] = useState(0);

  const handleChangeNextImage = () => {
    setCurrentSliderIndex(currentSliderIndex ===  activitySliderInfo.length - 1 ? 0 : currentSliderIndex + 1 )
}

  useEffect(() => {
    let array = []
    firestore.collection("activity").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        array.push(
          {
            id: doc.id,
            title: doc.data().title,
          }
        );
      });
      setActivitySliderInfo(array);
    })
  }, []);

  useEffect(() => {
    const autuChangeSlider = setInterval(handleChangeNextImage, 6000)
    return () => {
        clearInterval(autuChangeSlider);
    }
  })

  return (
    <div className="activity-slider-container" >
        {
          activitySliderInfo.map((slider, index) => {
            return (
              <div key={slider.id} className={`${index === currentSliderIndex ? "slide-active" : "slide"}`} >
                <p>
                  {slider.title}
                </p>
              </div>
            )
          })
        }
    </div>
  )
}

export default ActivitySlider;