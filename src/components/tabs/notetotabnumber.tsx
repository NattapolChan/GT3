import { useSampler } from "@/hooks/tone"
import { ReactNode } from "react"

export default function PlayNote(note: Array<number>, tune: Array<string>): ReactNode {
    const {
        sampler: guitarAcoustic,
        isLoaded,
        error,
    } = useSampler("guitar-acoustic")

    console.log(note)

    const mapper = []

    const tabToNotes = ()  => {
        if (!isLoaded || guitarAcoustic == null ) return
        guitarAcoustic?.playNote(["C3"], "2")
    }
    return (<></>)
}