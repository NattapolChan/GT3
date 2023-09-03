import { useSampler } from "@/hooks/tone"
import { useEffect } from "react"
import { Note } from "tone/build/esm/core/type/NoteUnits"

const dummyNote: Array<Note> = [
    "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", 
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", 
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", 
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", 
]

export const tabToNote = ( fretId: number, stringId: number) => {
    // return null if string not exist / no note played
    const noteAtZero : Array<Note> = ["E4", "B3", "G3", "D3", "A2", "E2"]
    const thisNoteAtZero = noteAtZero[stringId]
    const number = dummyNote.indexOf(thisNoteAtZero)
    if (fretId == -1) return null
    if (number+fretId >= 48) return null
    return dummyNote[number+fretId]
}

const Test = () => {

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

    // console.log("hi")
    tabToNote(1, 0)
    return (
        <div className="w-3/4 bg-blue-800 mx-auto">
            <div className="grid grid-cols-8 divide-x">
                {dummyNote.map((note, idx) => { return (<button
                onClick={(_) => {
                    if (!isLoaded || guitarAcoustic == null) return
                    guitarAcoustic.playNote(note, "2")
                }}
                className={note=="D#4" ? "text-red-500 text-xl bold" : "text-green-200 text-xl"}
                disabled={!isLoaded}
                >
                {note}
                </button>)})}
            </div>
        </div>
    )
}

export default Test;
