"use client"

import { ChangeEvent, useEffect, useState, type ReactNode } from "react"
import { dummyTab } from "@/dummydata/dummytab"
import { useSampler } from "@/hooks/tone"
import { EachBar, EachTab, Tune } from "@/components/tabs/eachnotefield"

import { Player } from "tone/build/esm/source/buffer/Player"
import { FFT, Sampler, ToneAudioBuffer, getDestination } from "tone/build/esm/index"
import { Buffer } from "tone/build/esm/index"
import { signal, tensor1d, tensor } from "@tensorflow/tfjs"

export default function EditTab(): ReactNode {

  const [datatabs, setDatatabs] = useState(dummyTab)
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
  const [convertFFT, setConvertFFT] = useState<FFT | null>(null) 
  const [sample, setSample] = useState<any>({})
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    if (file == null || file == undefined) return
    const fileURL = URL.createObjectURL(file)
    const buffer = new Buffer(fileURL)
    const convertFFT = new FFT(1024)

    setBuffer(buffer)
    setConvertFFT(convertFFT)
    console.log(buffer)
  }, [file])

  useEffect(() => {
    if (!buffer) return
    // const player = new Player(buffer, () => console.log("loading...../"))
    // setPlayer(player)
    const audioArray = tensor1d(buffer.getChannelData(0))
    const stftOutput = signal.stft(audioArray, 1000, 48000/8)
    stftOutput.print()
    const values = stftOutput.dataSync()
    const slice = Array.from(values)
    const shape = stftOutput.shape
    console.log(shape)
    var amplitude = []
    var phase = []
    var tempOdd = []
    var tempEven = []
    for (let i=0;i<slice.length;i++) {
      if (!shape[1]) return
      if (!(i % (shape[1]*2)) && i!=0) {
        amplitude.push(tempEven)
        phase.push(tempOdd)
        tempOdd = []
        tempEven = []
      }

      if (i%2) tempOdd.push(slice[i])
      else tempEven.push(slice[i])
    }
    console.log(amplitude)
  }, [buffer])

  // useEffect(() => {
  //   if (!player || !convertFFT) return
  // }, [player])

  // useEffect(() => {
  //   if (!convertFFT || !player) return
  //   const destination = getDestination()
  //   player.chain(convertFFT, destination)
  //   const levels = convertFFT.getValue()
  //   console.log(levels)
  // }, [convertFFT])

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
          <input type='file' accept="audio/mp3" onChange={(e) => handleinputfile(e)}></input>
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
