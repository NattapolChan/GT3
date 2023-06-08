"use client"

import { ChangeEvent, useEffect, useState, type ReactNode } from "react"
import { dummyTab } from "@/dummydata/dummytab"

import { useSampler } from "@/hooks/tone"
import { EachBar, EachTab, Tune } from "@/components/tabs/eachnotefield"
import Test from "@/components/tabs/testnotemapping"

export default function EditTab(): ReactNode {
  const [datatabs, setDatatabs] = useState(dummyTab)

  const [barInClipboard, setBarInClipboard] = useState([
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
  ])

  // time.setSeconds(time.getSeconds() + 600);

  const {
    sampler: guitarAcoustic,
    isLoaded,
    error,
  } = useSampler("guitar-acoustic")

  useEffect(() => {
    const keypressHandler = (e: KeyboardEvent) => {
      if (e.key === "c") {
        if (!isLoaded || guitarAcoustic == null) return
        // play a c major chord
        guitarAcoustic?.playNote(["C3", "E3", "G3"], "2")
      }
    }

    window.addEventListener("keypress", keypressHandler)

    return () => {
      window.removeEventListener("keypress", keypressHandler)
    }
  }, [guitarAcoustic])

  return (
    <div className="w-screen">
      <div className="px-auto text-40 mx-auto py-6 text-center font-mono text-2xl text-teal-400">
        Song Name
      </div>
      {/* <MyTimer expiryTimestamp={time} /> */}
      <Test />
      <div className="px-auto mx-auto w-9/12 content-center justify-center">
        <button
          onClick={(_) => {
            if (!isLoaded || guitarAcoustic == null) return
            guitarAcoustic.playNote("A3", "2")
          }}
          className="text-green-400"
          disabled={!isLoaded}
        >
          play
        </button>
        <button>
          <input type="file"></input>
        </button>
        <div className="absolute pt-4 text-sm">
          {<Tune stringTune={datatabs.stringTune} />}
        </div>
        <div className="grid-col grid grid-cols-2 divide-x-[0.1px] border lg:grid-cols-3">
          {datatabs.tab.map((list, idx) => {
            return (
              <div key={`${idx} + ${list}`}>
                <EachBar
                  key={"bar-" + `${idx}`}
                  noteBarList={list}
                  isFirst={idx == 0}
                  datatabs={datatabs}
                  setDatatabs={setDatatabs}
                  barnumber={idx}
                  barInClipboard={barInClipboard}
                  setBarInClipboard={setBarInClipboard}
                />
                <EachTab
                  key={"tab-" + `${idx}`}
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
