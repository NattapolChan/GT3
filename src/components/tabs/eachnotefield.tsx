import { useState, useCallback, useMemo } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { debounceAsync } from '@/components/tabs/debounceasync'
import AutoSave from '@/components/tabs/autosave'
import NoteInput from '@/components/tabs/noteinput'

import { type EachBarProps, EachTabProps, Values } from '@/type/tabs'

export const Tune = ({ stringTune }: any) => {
  return (
    <div className="grid -translate-x-6 grid-rows-6 translate-y-1.5">
      {stringTune.map((noteLabel: any, id: number) => {
        return (
          <div key={id} className="bg-slate-900 text-green-400 text-xs leading-3 font-extrabold ">
            <p>{noteLabel}</p>
          </div>
        )
      })}
    </div>
  )
}

export const EachTab = ({ noteStringList, isFirst }: EachTabProps) => {
  return (
    <div className="absolute lg:w-1/4 w-[37.325%] -translate-y-24">
      {noteStringList.map((noteString, idx) => {
        return (
          <div key={idx} className="z-0">
            {<svg width="100%" height="12">
              <line
                x1="0%"
                y1="95%"
                x2="100%"
                y2="95%"
                className="stroke-gray-500 stroke-4"
              />
            </svg>}
          </div>
        )
      })}
    </div>
  )
}

export const EachBar = ({
  noteBarList,
  isFirst,
  datatabs,
  setDatatabs,
  barnumber,
  barInClipboard,
  setBarInClipboard,
}: EachBarProps) => {
  const emptytabsArray = [
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
  ]

  const updateNoteInDatatabs = (
    values: Values,
    stringId: number,
    tabId: number,
    barId: number
  ) => {
    console.log('update')
    let newdatatabsArray = [...datatabs.tab]
    if (!values.note) {
      values.note = -1
    }
    newdatatabsArray[barId][tabId][stringId] = parseInt(values.note)
    setDatatabs({
      bpm: datatabs.bpm,
      timeSig: datatabs.timeSig,
      stringTune: datatabs.stringTune,
      tab: newdatatabsArray,
    })
  }

  const pasteBarfromClipboard = () => {
    console.log('update')
    if (barInClipboard === emptytabsArray) {
      console.log('Got empty clipboard')
    } else {
      let newdatatabsArray = [
        ...datatabs.tab.slice(0, barnumber + 1),
        barInClipboard,
        ...datatabs.tab.slice(barnumber + 1),
      ]
      setDatatabs({
        bpm: datatabs.bpm,
        timeSig: datatabs.timeSig,
        stringTune: datatabs.stringTune,
        tab: newdatatabsArray,
      })
    }
  }

  const copyBartoClipboard = () => {
    setBarInClipboard(datatabs.tab[barnumber])
  }

  const addNoteInDatatabs = (barId: number) => {
    console.log('update')
    let newdatatabsArray = [
      ...datatabs.tab.slice(0, barId + 1),
      emptytabsArray,
      ...datatabs.tab.slice(barId + 1),
    ]
    setDatatabs({
      bpm: datatabs.bpm,
      timeSig: datatabs.timeSig,
      stringTune: datatabs.stringTune,
      tab: newdatatabsArray,
    })
  }

  const delNoteInDatatabs = (barId: number) => {
    console.log('update')
    let newdatatabsArray = [
      ...datatabs.tab.slice(0, barId),
      ...datatabs.tab.slice(barId + 1),
    ]
    setDatatabs({
      bpm: datatabs.bpm,
      timeSig: datatabs.timeSig,
      stringTune: datatabs.stringTune,
      tab: newdatatabsArray,
    })
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }
  const handleAddOneBar = () => {
    addNoteInDatatabs(barnumber)
  }
  const handleDelOneBar = () => {
    delNoteInDatatabs(barnumber)
  }
  return (
    <div
      className="relative z-20 w-full bg-transparent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute right-0 z-20 w-6">
        {isHover && (
          <div>
            <button onClick={handleAddOneBar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" x2="12" y1="8" y2="16"></line>
                <line x1="8" x2="16" y1="12" y2="12"></line>
              </svg>
            </button>
            <button onClick={handleDelOneBar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-2"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" x2="10" y1="11" y2="17"></line>
                <line x1="14" x2="14" y1="11" y2="17"></line>
              </svg>
            </button>
            <button onClick={copyBartoClipboard}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="blue"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-copy"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </svg>
            </button>
            <button onClick={pasteBarfromClipboard}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="green"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clipboard-paste"
              >
                <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"></path>
                <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10"></path>
                <path d="m17 10 4 4-4 4"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-8 p-5 px-1 text-center text-teal-400">
        {noteBarList.map((noteBar, idx) => {
          return (
            <div key={idx}>
              <div className="grid grid-rows-6" key={idx}>
                {noteBar.map((note, i) => {
                  return (
                    <div key={i}>
                      <div className="select-none text-xs leading-3 font-extrabold h-3">
                        <div 
                          className={
                            (note==-1) ? 
                            "relative z-10 w-4 translate-x-3 my-0 bg-transparent hover:bg-slate-900"
                            :
                            "relative z-10 w-4 translate-x-3 my-0 bg-slate-900"
                          }
                        >
                          <Formik
                            initialValues={{ note: note == -1 ? '' : note }}
                            onSubmit={async (values) => {
                              updateNoteInDatatabs(values, i, idx, barnumber)
                              await delay(2000)
                              return true
                            }}
                          >
                            {({ isSubmitting, submitForm }) => (
                              <Form>
                                <NoteInput
                                  name="note"
                                  id="note"
                                  disabled={isSubmitting}
                                />
                                <AutoSave onSubmit={submitForm} />
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
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
