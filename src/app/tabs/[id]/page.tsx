"use client"

import { ChangeEvent, useCallback, useEffect, useState, type ReactNode } from "react"
import { dummyTab } from "@/dummydata/dummytab"
import { useSampler } from "@/hooks/tone"
import { useRouter } from "next/navigation"
import { EachBar, EachTab, Tune } from "@/components/tabs/eachnotefield"

import { Player } from "tone/build/esm/source/buffer/Player"
import { FFT, Sampler, ToneAudioBuffer, getDestination } from "tone/build/esm/index"
import { Buffer } from "tone/build/esm/index"
import { signal, tensor1d, tensor, Tensor, Rank, Tensor1D } from "@tensorflow/tfjs"
import axios from 'axios'
import { exec } from "child_process"
import PlayBar from "@/components/tabs/playbar"
import { songObjectType } from "@/type/tabs"
import { useTimer } from 'use-timer'

export default function EditTab(): ReactNode {

  const [datatabs, setDatatabs] = useState<songObjectType>(dummyTab)
  const [file, setFile] = useState<File>()

  const handleinputfile = (e : ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setFile(e.target.files[0])
  }

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

  const [buffer, setBuffer] = useState<ToneAudioBuffer | null>(null)
  const [channelData, setChannelData] = useState<Float32Array | null>(null)
  const [audioArray, setAudioArray] = useState<Tensor1D | null>(null)
  const [stftOutput, setStftOutput] = useState<Tensor<Rank>| null>(null)
  const [curCursorIndex, setCurCursorIndex] = useState<number>(0)

  const [mode, setMode] = useState<"Normal" | "Edit">("Normal")
  const [commandBuffer, setCommandBuffer] = useState<string>("")

  useEffect(()=> {
	if (isLoaded) {
		console.log("Guitar output compiled successfully")
	}

  }, [guitarAcoustic])


  useEffect(() => {
    setCommandBuffer("")
  }, [mode])

  const router = useRouter()

  const executeCommand = () => {
    setCommandBuffer("")
    // add command here
    if (commandBuffer.includes("w")) {
      console.log("save")
    }
    if (commandBuffer.includes("q")) { 
      router.push("/tabs/") 
    }
  }

  const keypressHandler = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setMode("Normal")
    }
    else if (event.key === "i") {
      setMode("Edit")
    }
    else commandHandler(event.key)
  }

  const commandHandler = (char: string) => {
    if (char === ":") setCommandBuffer(":")
    else if (char === "Enter") executeCommand()
    else if (
      mode==="Normal" && 
      char.length === 1 &&
      commandBuffer[0] === ":"
    ) {
      setCommandBuffer("" + commandBuffer + char)
    }
    else if (
      char === "Backspace"
    ) setCommandBuffer(commandBuffer.substring(0, commandBuffer.length-1))
    else if (
      commandBuffer[0] != ":"
    ) setCommandBuffer(char)
  }

  useEffect(() => {
    document.addEventListener("keydown", keypressHandler, false);

    return () => {
      document.removeEventListener("keydown", keypressHandler, false);
    };
  }, [keypressHandler]);

  useEffect(() => {
    const keypressHandler = (e: KeyboardEvent) => {
      if (e.key === "c") {
        if (!isLoaded || guitarAcoustic == null) return
        // play a c major chord
        guitarAcoustic?.playNote(["C3", "E3", "G3"], "2", "1")
      }
    }
    window.addEventListener("keypress", keypressHandler)
    return () => {
      window.removeEventListener("keypress", keypressHandler)
    }
  }, [guitarAcoustic])

  const { time , start, pause, reset, status } = useTimer({
    endTime: datatabs.tab.length,
    initialTime: -1,
    step: 1,
    interval: 1000,
  });

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="px-auto text-40 mx-auto py-6 text-center font-mono text-2xl text-teal-400">
        Song Name
      </div>
      <div className="grid grid-cols-3 mx-auto">
        <button className="flex  gap-3 mx-auto border border-gray-400 bg-transparent px-2 py-2 font-semibold text-gray-100 hover:border-teal-400 hover:text-teal-400"
          onClick={start}
        >
          Start
        </button>
        <button className="flex  gap-3 mx-auto border border-gray-400 bg-transparent px-2 py-2 font-semibold text-gray-100 hover:border-teal-400 hover:text-teal-400"
          onClick={pause}
        >
          Pause 
        </button>
        <button className="flex  gap-3 mx-auto border border-gray-400 bg-transparent px-2 py-2 font-semibold text-gray-100 hover:border-teal-400 hover:text-teal-400"
          onClick={reset}
        >
          Reset 
        </button>

      </div>
      {/* <MyTimer expiryTimestamp={time} /> */}
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

        <div className="absolute pt-4 text-sm">
          {<Tune stringTune={datatabs.stringTune} />}
        </div>
        <div className="grid-col grid grid-cols-2 divide-x-[0.1px] border lg:grid-cols-3 2xl:grid-cols-5">
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
                  time={ (time>=idx && time-idx<1) ? 1: -1}
                />
              </div>
            )
          })}
          <PlayBar bar={(time>=0) ? datatabs.tab[time] : null} status={status} guitarAcoustic={guitarAcoustic}/>
        </div>
      </div>
      <footer className="fixed inset-x-0 bottom-5 text-teal-400 bg-gray-700 px-6 grid grid-cols-6 z-50">
        <div className="col-span-2">-- {mode} --</div>
        <div></div>
        <div></div>
        <div>{commandBuffer}</div>
        <div dir="rtl">{curCursorIndex}</div>
      </footer>
    </div>
  )
}
