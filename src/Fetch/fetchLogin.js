// import React from "react";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";

// const minuteSeconds = 60;
// const hourSeconds = 3600;

// const timerProps = {
//   isPlaying: true,
//   size: 120,
//   strokeWidth: 6
// };

// const renderTime = (dimension, time) => {
//   return (
//     <div className="time-wrapper">
//       <div className="time">{time}</div>
//       <div>{dimension}</div>
//     </div>
//   );
// };

// const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
// const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;

// export default function FetchLogin() {
//   const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
//   const endTime = stratTime + 243248; // use UNIX timestamp in seconds

//   const remainingTime = endTime - stratTime;

//   return (
//     <div className="App">
//       <CountdownCircleTimer
//         {...timerProps}
//         colors={[["#EF798A"]]}
//         duration={hourSeconds}
//         initialRemainingTime={remainingTime % hourSeconds}
//         onComplete={(totalElapsedTime) => [
//           remainingTime - totalElapsedTime > minuteSeconds
//         ]}
//       >
//         {({ elapsedTime }) =>
//           renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
//         }
//       </CountdownCircleTimer>
//       <CountdownCircleTimer
//         {...timerProps}
//         colors={[["#218380"]]}
//         duration={minuteSeconds}
//         initialRemainingTime={remainingTime % minuteSeconds}
//         onComplete={(totalElapsedTime) => [
//           remainingTime - totalElapsedTime > 0
//         ]}
//       >
//         {({ elapsedTime }) =>
//           renderTime("seconds", getTimeSeconds(elapsedTime))
//         }
//       </CountdownCircleTimer>
//     </div>
//   );
// }
