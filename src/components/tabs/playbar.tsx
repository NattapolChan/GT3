import { fretRange } from '@/type/tabs'
import React, { useEffect } from 'react'
import { Status } from 'use-timer/lib/types'
import { Note } from "tone/build/esm/core/type/NoteUnits"
import { tabToNote } from './testnotemapping'

type PlayBarProps = {
    bar: Array<Array<fretRange>> | null
    status: Status
    guitarAcoustic: any
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const PlayBar = ({bar, status, guitarAcoustic} : PlayBarProps) => {
    useEffect(()=>{
        // console.log(bar)
        for (let i=0;i<8;i++) {
            let notes: Array<Note> = []
            if (bar===null || bar===undefined) continue
            if (bar[i]===null || bar[i]===undefined) continue
            for (let bnum=0;bnum<6;bnum++) {
                if (bar[i][bnum]===null) continue
                let note = tabToNote(bar[i][bnum], bnum)
                if (note===null) continue
                notes.push(note)
            }
            console.log(notes)
            if (notes.length===0) continue
            try{
                guitarAcoustic.playNote(notes, 1)
            }
            catch(err){
                console.log(err)
                console.log(notes)
            }
            // guitarAcoustic?.playNote(notes, 1)
        }
    }, [bar])
    return (<></>)
}

export default PlayBar;
