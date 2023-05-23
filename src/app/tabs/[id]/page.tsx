'use client'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const dummyTab = {
  bpm: 120, // dont care for now
  timeSig: [4, 4], // dont care for now
  stringTune: ['e', 'B', 'G', 'D', 'A', 'E'],
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
  ],
}

export default function EditTab(): ReactNode {
  let pathname = usePathname() as string
  return (
    <div className="w-full">
      <div className="px-auto text-40 mx-auto py-6 text-center font-mono text-2xl text-teal-400">
        Song Name
      </div>
      <div className="w-full content-center justify-center">
        <div className="grid-col grid divide-x lg:grid-cols-2">
          {dummyTab.tab.map((list, idx) => {
            console.log(idx)
            return (
              <div key={idx}>
                <EachBar key={idx} noteBarList={list} isFirst={idx == 0} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

type EachBarProps = {
  noteBarList: Array<Array<number>>
  isFirst: boolean
}

const EachBar = ({ noteBarList, isFirst }: EachBarProps) => {
  // console.log(noteBarList);
  // console.log(key);
  console.log(isFirst)
  // return <div className='text-teal-400'>{JSON.stringify(noteBarList)}</div>
  return (
    <div>
      <div className="grid grid-cols-8 p-4 text-center text-teal-400">
        {noteBarList.map((noteBar, idx) => {
          return (
            <div className="grid grid-rows-6 divide-y" key={idx}>
              {noteBar.map((note, i) => {
                return note != -1 && <div className="text-sm">{note}</div>
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
