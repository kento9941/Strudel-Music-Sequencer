// import React, { useState, useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { getD3Data } from "../console-monkey-patch";
// import { useStrudelStore } from "../stores/use-strudel-store";

// const BAR_NUM = 8;
// const BAR_WIDTH = 40;
// const BAR_MARGIN = 15;

// export default function AudioVisualizer() {
//     const isPlaying = useStrudelStore((state) => state.isPlaying);

//     const [strudelData, setStrudelData] = useState([]);
//     const [bars, setBars] = useState(
//         new Array(BAR_NUM).fill(0).map(() => ({
//             power: 0, lastUpdated: 0
//         })));

//     const svgRef = useRef(null);

//     // set strudelData every 0.5 sec
//     useEffect(() => {
//         if (!isPlaying) return;

//         const interval = setInterval(() => {
//             let tempData = getD3Data();
//             let result = [];

//             tempData.forEach(d => {
//                 const noteMatch = d.match(/note:([a-gs\d#]+)/i);
//                 const gainMatch = d.match(/postgain:([\d.]+)/);

//                 const note = noteMatch ? noteMatch[1] : "";
//                 const gain = gainMatch ? Number(gainMatch[1]) : 0;

//                 result.push(calcPower(note, gain));
//             })

//             setStrudelData(result);
//         }, 500)

//         return () => clearInterval(interval);
//     }, [isPlaying])

//     // update bars when strudelData is updated
//     useEffect(() => {
//         if (strudelData.length === 0) return;

//         strudelData.forEach((power, i) => {
//             // ramdomize update
//             const delay = Math.random() * 300;

//             setTimeout(() => {
//                 setBars(prev => {
//                     const newBars = [...prev];
//                     const barIndex = i % newBars.length;

//                     newBars[barIndex] = {
//                         power: power,
//                         lastUpdated: Date.now(),
//                     };
//                     return newBars;
//                 });
//             }, delay);
//         });
//     }, [strudelData]);

//     // decay bars when strudelData is not updated
//     useEffect(() => {
//         if (!isPlaying) return;

//         const decay = 0.2;
//         const interval = setInterval(() => {
//             setBars(prev => 
//                 prev.map(bar => ({
//                     ...bar,
//                     power: Math.max(0, bar.power - decay)
//                 }))
//             );
//         }, 150);

//         return () => clearInterval(interval);
//     }, [isPlaying]);

//     // when not playing → reset bars and strudelData
//     useEffect(() => {
//         if (!isPlaying) {
//             setBars(new Array(BAR_NUM).fill(0).map(() => ({ power: 0, lastUpdated: 0 })));
//             setStrudelData([]);
//         }
//     }, [isPlaying]);

//     // D3 update
//     useEffect(() => {
//         const svg = d3.select(svgRef.current);
//         const h = 200;
//         const yScale = d3.scaleLinear().domain([0, 4]).range([h, 0]);
//         const data = bars.map(bar => bar.power);

//         svg.selectAll("rect")
//             .data(data)
//             .attr("y", d => isFinite(d) ? yScale(d) : h)
//             .attr("height", d => isFinite(d) ? (h - yScale(d)) * 2 : 0);
//     }, [bars]);

//     return (
//             <svg ref={svgRef} width={800} height={400} style={{ display: isPlaying ? "block" : "none" }} >
//                 {bars.map((_, i) => (
//                     <rect
//                     key={i}
//                     x={i * BAR_WIDTH}
//                     width={BAR_WIDTH - BAR_MARGIN}
//                     fill="none"
//                     stroke="white"
//                     strokeWidth={1}
//                     />
//                 ))}
//             </svg>

//     )
// }



// // function to calculate power based on note and gain
// export function calcPower(note, gain) {
//     return calcNote(note) * gain / 2;
// }

// export function calcNote(note) {
//     let n;
//     if (note.startsWith("cs")) {
//         n = 1.15;
//     }
//     else if (note.startsWith("ds")) {
//         n = 1.3;
//     }
//     else if (note.startsWith("fs")) {
//         n = 1.55;
//     }
//     else if (note.startsWith("gs")) {
//         n = 1.7;
//     }
//     else if (note.startsWith("as")) {
//         n = 1.85;
//     }
//     else if (note.startsWith("c")) {
//         n = 1.1;
//     }
//     else if (note.startsWith("d")) {
//         n = 1.25;
//     }
//     else if (note.startsWith("e")) {
//         n = 1.4;
//     }
//     else if (note.startsWith("f")) {
//         n = 1.5;
//     }
//     else if (note.startsWith("g")) {
//         n = 1.65;
//     }
//     else if (note.startsWith("a")) {
//         n = 1.8;
//     }
//     else if (note.startsWith("b")) {
//         n = 1.9;
//     }
//     else {
//         return 1.5;
//     }
//     return n * calcOctave(note);
// }

// export function calcOctave(note) {
//     if (note.endsWith("1")) {
//         return 1.1;
//     }
//     else if (note.endsWith("2")) {
//         return 1.2;
//     }
//     else if (note.endsWith("3")) {
//         return 1.4;
//     }
//     else if (note.endsWith("4")) {
//         return 1.6;
//     }
//     else if (note.endsWith("5")) {
//         return 1.8;
//     }
//     return 1.9;
// }
