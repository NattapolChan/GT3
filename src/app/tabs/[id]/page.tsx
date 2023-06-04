'use client'
import { useState, type ReactNode } from 'react'
import { Tune, EachBar, EachTab } from '@/components/tabs/eachnotefield'
import { dummyTab } from '@/dummydata/dummytab'

export default function EditTab(): ReactNode {

  const [datatabs, setDatatabs] = useState(dummyTab)
  
  const [barInClipboard, setBarInClipboard] = useState([
	[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],
  ])

  return (
    <div className="w-full">
      <div className="px-auto text-40 mx-auto py-6 text-center font-mono text-2xl text-teal-400">
        Song Name
      </div>
      {/* <MyTimer expiryTimestamp={time} /> */}
      <div className="w-full content-center justify-center">
        <button className="text-green-400">play</button>
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

