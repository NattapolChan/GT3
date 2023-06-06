import { useMemo, useState } from "react"
import { Time } from "tone/build/esm/core/type/Units"
import { getDestination } from "tone/build/esm/index"
import { Sampler, SamplerOptions } from "tone/build/esm/instrument/Sampler"

export const notes = {
  "guitar-acoustic": {
    F4: "F4.[mp3|ogg]",
    "F#2": "Fs2.[mp3|ogg]",
    "F#3": "Fs3.[mp3|ogg]",
    "F#4": "Fs4.[mp3|ogg]",
    G2: "G2.[mp3|ogg]",
    G3: "G3.[mp3|ogg]",
    G4: "G4.[mp3|ogg]",
    "G#2": "Gs2.[mp3|ogg]",
    "G#3": "Gs3.[mp3|ogg]",
    "G#4": "Gs4.[mp3|ogg]",
    A2: "A2.[mp3|ogg]",
    A3: "A3.[mp3|ogg]",
    A4: "A4.[mp3|ogg]",
    "A#2": "As2.[mp3|ogg]",
    "A#3": "As3.[mp3|ogg]",
    "A#4": "As4.[mp3|ogg]",
    B2: "B2.[mp3|ogg]",
    B3: "B3.[mp3|ogg]",
    B4: "B4.[mp3|ogg]",
    C3: "C3.[mp3|ogg]",
    C4: "C4.[mp3|ogg]",
    C5: "C5.[mp3|ogg]",
    "C#3": "Cs3.[mp3|ogg]",
    "C#4": "Cs4.[mp3|ogg]",
    "C#5": "Cs5.[mp3|ogg]",
    D2: "D2.[mp3|ogg]",
    D3: "D3.[mp3|ogg]",
    D4: "D4.[mp3|ogg]",
    D5: "D5.[mp3|ogg]",
    "D#2": "Ds2.[mp3|ogg]",
    "D#3": "Ds3.[mp3|ogg]",
    "D#4": "Ds3.[mp3|ogg]",
    E2: "E2.[mp3|ogg]",
    E3: "E3.[mp3|ogg]",
    E4: "E4.[mp3|ogg]",
    F2: "F2.[mp3|ogg]",
    F3: "F3.[mp3|ogg]",
  },

  "guitar-electric": {
    "D#3": "Ds3.[mp3|ogg]",
    "D#4": "Ds4.[mp3|ogg]",
    "D#5": "Ds5.[mp3|ogg]",
    E2: "E2.[mp3|ogg]",
    "F#2": "Fs2.[mp3|ogg]",
    "F#3": "Fs3.[mp3|ogg]",
    "F#4": "Fs4.[mp3|ogg]",
    "F#5": "Fs5.[mp3|ogg]",
    A2: "A2.[mp3|ogg]",
    A3: "A3.[mp3|ogg]",
    A4: "A4.[mp3|ogg]",
    A5: "A5.[mp3|ogg]",
    C3: "C3.[mp3|ogg]",
    C4: "C4.[mp3|ogg]",
    C5: "C5.[mp3|ogg]",
    C6: "C6.[mp3|ogg]",
    "C#2": "Cs2.[mp3|ogg]",
  },

  "guitar-nylon": {
    "F#2": "Fs2.[mp3|ogg]",
    "F#3": "Fs3.[mp3|ogg]",
    "F#4": "Fs4.[mp3|ogg]",
    "F#5": "Fs5.[mp3|ogg]",
    G3: "G3.[mp3|ogg]",
    G5: "G3.[mp3|ogg]",
    "G#2": "Gs2.[mp3|ogg]",
    "G#4": "Gs4.[mp3|ogg]",
    "G#5": "Gs5.[mp3|ogg]",
    A2: "A2.[mp3|ogg]",
    A3: "A3.[mp3|ogg]",
    A4: "A4.[mp3|ogg]",
    A5: "A5.[mp3|ogg]",
    "A#5": "As5.[mp3|ogg]",
    B1: "B1.[mp3|ogg]",
    B2: "B2.[mp3|ogg]",
    B3: "B3.[mp3|ogg]",
    B4: "B4.[mp3|ogg]",
    "C#3": "Cs3.[mp3|ogg]",
    "C#4": "Cs4.[mp3|ogg]",
    "C#5": "Cs5.[mp3|ogg]",
    D2: "D2.[mp3|ogg]",
    D3: "D3.[mp3|ogg]",
    D5: "D5.[mp3|ogg]",
    "D#4": "Ds4.[mp3|ogg]",
    E2: "E2.[mp3|ogg]",
    E3: "E3.[mp3|ogg]",
    E4: "E4.[mp3|ogg]",
    E5: "E5.[mp3|ogg]",
  },
} as const

export type Instrument = keyof typeof notes
export type Note<T extends Instrument> = T extends keyof typeof notes
  ? keyof (typeof notes)[T]
  : never

export const useSampler = (instrument: Instrument) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { sampler, error } = useMemo(() => {
    try {
      console.log("loading")
      const sampler = new SamplerT<typeof instrument>({
        urls: notes[instrument],
        baseUrl: `/samples/${instrument}/`,
        onload: () => {
          setIsLoaded(true)
        },
      })

      const destination = getDestination()

      sampler.connect(destination)

      return { sampler, error: null }
    } catch (error) {
      console.error(error)
      return { sampler: null, error: error as Error }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { sampler, isLoaded, error }
}

class SamplerT<T extends keyof typeof notes> extends Sampler {
  constructor(options: Partial<SamplerOptions>) {
    super(options)
  }

  playNote(
    note: Note<T> | Note<T>[],
    duration: Time | Time[],
    time?: Time,
    velocity?: number
  ) {
    this.triggerAttackRelease(note, duration, time, velocity)
  }
}
