'use client'
import { useState, ChangeEvent, type ReactNode } from 'react'
import { Tune, EachBar, EachTab } from '@/components/tabs/eachnotefield'
import { dummyTab } from '@/dummydata/dummytab'

export default function EditTab(): ReactNode {

  const [datatabs, setDatatabs] = useState(dummyTab)
  
  const [barInClipboard, setBarInClipboard] = useState([
	[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],
  ])

  const [file, setFile] = useState<File>();

  const handleinputfile = (e : ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
    console.log("hi")
    console.log(file)
  }

  const handleSubmit = () => {
    console.log(file)
  }

  return (
    <div className="w-screen">
      <div className="px-auto text-40 mx-auto py-6 text-center font-mono text-2xl text-teal-400">
        Song Name
      </div>
      {/* <MyTimer expiryTimestamp={time} /> */}
      <div className="w-9/12 px-auto mx-auto content-center justify-center">
        <button className="text-green-400">play</button>
        <button onSubmit={handleSubmit}>
          <input type='file' onChange={(e) => handleinputfile}></input>
        </button>
          <div className="absolute pt-4 text-sm">
            {<Tune stringTune={datatabs.stringTune} />}
          </div>
          <div className="grid-col grid lg:grid-cols-3 grid-cols-2 border divide-x-[0.1px]">
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

