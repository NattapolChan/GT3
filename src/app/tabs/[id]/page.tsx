'use client'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const dummyTab = {
  bpm: 120, // dont care for now
  timeSig: [4, 4], // dont care for now
  stringTune: ['E', 'A', 'D', 'G', 'B', 'e'],
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
      [-1, -1, -1, -1, -1, 3],
      [-1, -1, -1, 4, -1, 3],
      [-1, -1, -1, -1, -1, 3],
      [-1, -1, -1, 4, -1, 3],
      [-1, -1, -1, 4, -1, 3],
      [-1, -1, -1, -1, -1, 3],
      [-1, -1, -1, 4, -1, 3],
      [-1, -1, -1, 4, -1, 3],
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
        <div className="absolute pt-4 text-sm">
          {<Tune stringTune={dummyTab.stringTune} />}
        </div>
        <div className="grid-col grid lg:grid-cols-2 border divide-x-[0.1px]">
          {dummyTab.tab.map((list, idx) => {
            console.log(idx)
            return (
              <div key={`${idx} + ${list}`}>
                <EachBar
                  key={`${idx} + ${list}`}
                  noteBarList={list}
                  isFirst={idx == 0}
                />
                <EachTab
                  key={`${idx} + ${list}`}
                  noteStringList={dummyTab.stringTune}
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

type EachBarProps = {
  noteBarList: Array<Array<number>>
  isFirst: boolean
}

type EachTabProps = {
  noteStringList: Array<string>
  isFirst: boolean
}

const Tune = ({ stringTune }: any) => {
  return (
    <div className="grid -translate-x-6 grid-rows-6">
      {stringTune.map((noteLabel: any, id: number) => {
        return (
          <div key={id} className="bg-slate-900 text-green-400">
            <p>{noteLabel}</p>
          </div>
        )
      })}
    </div>
  )
}

const EachTab = ({ noteStringList, isFirst }: EachTabProps) => {
  return (
    <div className="absolute -translate-y-36">
      {noteStringList.map((noteString, idx) => {
        return (
          <div key={idx} className='z-0'>
            <svg height="20" width="400">
              <line
                x1="0"
                y1="18"
                x2="380"
                y2="18"
                className="stroke-gray-500 stroke-2"
              />
            </svg>
          </div>
        )
      })}
    </div>
  )
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
            <div key={idx}>
              <div className="grid grid-rows-6" key={idx}>
                {noteBar.map((note, i) => {
                  return (
                    <div className="bg-slate-900" key={i}>
                      {note != -1 ? (
                        <div className="select-none bg-slate-900 text-sm">
                          <div className="relative translate-x-3 w-4 bg-slate-900 z-10">
                            {note}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-900 text-sm"> </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
