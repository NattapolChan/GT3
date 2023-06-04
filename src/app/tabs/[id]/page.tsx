'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect, type ReactNode } from 'react'
import { Tune, EachBar, EachTab } from '@/components/tabs/eachnotefield'
import { type songObjectType } from '@/type/tabs'
import { useTimer } from 'react-timer-hook'
import { Sampler } from 'tone/build/esm/instrument/Sampler'
import {  getDestination} from 'tone/build/esm/index'

const dummyTab : songObjectType = {
  bpm: 120, // dont care for now
  timeSig: [4, 4], // dont care for now
  stringTune: ['E', 'A', 'D', 'G', 'B', 'e'],
  tab: [
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [-1, -1, -1, -1, -1, 3],
      [-1, -1, -1, 4, -1, 3],
      [-1, -1, -1, -1, -1, 3],
      [-1, -1, -1, 4, -1, 3],
      [-1, -1, -1, 4, -1, 3],
      [-1, -1, -1, -1, -1, 3],
      [-1, -1, -1, 4, -1, 3],
      [-1, -1, -1, 4, -1, 3],
    ],
    [
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
    ],
    [
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
      [-1, 0, 0, 2, 3, 2],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
    [
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
      [2, 2, 4, 4, 3, 2],
    ],
    [
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
      [3, 5, 5, 4, 3, 3],
    ],
  ],
}


// function MyTimer({ expiryTimestamp }) {
//   const {
//     seconds,
//     minutes,
//     hours,
//     days,
//     isRunning,
//     start,
//     pause,
//     resume,
//     restart,
//   } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


//   return (
//     <div className='text-center text-green-500'>
//       <h1>react-timer-hook </h1>
//       <p>Timer Demo</p>
//       <div style={{fontSize: '100px'}}>
//         <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
//       </div>
//       <p>{isRunning ? 'Running' : 'Not running'}</p>
//       <button onClick={start}>Start</button>
//       <button onClick={pause}>Pause</button>
//       <button onClick={resume}>Resume</button>
//       <button onClick={() => {
//         // Restarts to 5 minutes timer
//         const time = new Date();
//         time.setSeconds(time.getSeconds() + 300);
//         restart(time)
//       }}>Restart</button>
//     </div>
//   );
// }


export default function EditTab(): ReactNode {
  let pathname = usePathname() as string
  const time = new Date();

  const [datatabs, setDatatabs] = useState(dummyTab)
  
  const [barInClipboard, setBarInClipboard] = useState([
	[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],
  ])

  // time.setSeconds(time.getSeconds() + 600);

  const [isLoaded, setIsLoaded] = useState(false)
  const guitarAcoustic = useRef<Sampler | null>(null)
  
  useEffect(() => {
    const sampler = new Sampler({
      urls: {
        A3: "A3.mp3",
      },
      baseUrl: "/samples/guitar-acoustic/",
      onload: () => {
        setIsLoaded(true)
      },

    })
    guitarAcoustic.current = sampler.connect(getDestination())
    guitarAcoustic.current.toDestination()
  }, [])

  return (
    <div className="w-full">
      <div className="px-auto text-40 mx-auto py-6 text-center font-mono text-2xl text-teal-400">
        Song Name
      </div>
      {/* <MyTimer expiryTimestamp={time} /> */}
      <div className="w-full content-center justify-center">
        <button 
          onClick={(_) => {
            if (!isLoaded || guitarAcoustic.current == null)
              return
            guitarAcoustic.current.triggerAttackRelease("A3", "8n")
          }}
          className="text-green-400"
          disabled={!isLoaded}
          >play</button>
          <div className="absolute pt-4 text-sm">
            {<Tune stringTune={datatabs.stringTune} />}
          </div>
          <div className="grid-col grid lg:grid-cols-2 border divide-x-[0.1px]">
            {datatabs.tab.map((list, idx) => {
              return (
                <div key={`${idx} + ${list}`}>
                  <EachBar
                    key={"bar-"+`${idx}`}
                    noteBarList={list}
                    isFirst={idx == 0}
                    datatabs={datatabs}
                    setDatatabs={setDatatabs}
                    barnumber={idx}
                    barInClipboard={barInClipboard}
		                setBarInClipboard={setBarInClipboard}
                  />
                  <EachTab
                    key={"tab-"+`${idx}`}
                    noteStringList={datatabs.stringTune}
                    isFirst={idx == 0}
                  />
                </div>
              )
            })}
          </div>
      </div>
    </div>
  )
}

