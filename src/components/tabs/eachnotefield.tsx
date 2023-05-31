import {useState, useCallback, useMemo} from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { debounceAsync } from '@/components/tabs/debounceasync';
import AutoSave from '@/components/tabs/autosave';
import NoteInput from '@/components/tabs/noteinput';

import { type EachBarProps, EachTabProps, Values } from '@/type/tabs';

export const Tune = ({ stringTune }: any) => {
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
  
export const EachTab = ({ noteStringList, isFirst }: EachTabProps) => {
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
  
export const EachBar = ({ noteBarList, isFirst, datatabs, setDatatabs, barnumber }: EachBarProps) => {
    // console.log(noteBarList);
    // console.log(key);
    // return <div className='text-teal-400'>{JSON.stringify(noteBarList)}</div>
    const updateNoteInDatatabs = (values : Values, stringId: number, tabId: number, barId: number) => {
      let newdatatabsArray = [...datatabs.tab]
      newdatatabsArray[barId][tabId][stringId] = parseInt(values.note)
      setDatatabs({
        bpm: datatabs.bpm, 
        timeSig: datatabs.timeSig, 
        stringTune: datatabs.stringTune,
        tab: newdatatabsArray,
      })
    }

    const addNoteInDatatabs = (barId: number) => {
    	const emptytabsArray = [
		[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],
	]
	let newdatatabsArray = [
					...datatabs.tab.slice(0, barId+1),
					emptytabsArray,
					...datatabs.tab.slice(barId+1),
				]
      setDatatabs({
        bpm: datatabs.bpm, 
        timeSig: datatabs.timeSig, 
        stringTune: datatabs.stringTune,
        tab: newdatatabsArray,
      })
    }

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  	const [isHover, setIsHover] = useState(false)
	const handleMouseEnter = () => {
		setIsHover(true)
		console.log("enter")
	}
	const handleMouseLeave = () => {
		setIsHover(false)
		console.log("leave")
	}
	const handleAddOneBar = () => {
		console.log("add")
		console.log(barnumber)
		addNoteInDatatabs(barnumber)	
	}
    return (
      <div className="relative bg-transparent w-full z-20"
		onMouseEnter={handleMouseEnter}
		onMouseLeave={handleMouseLeave}
      >
        <div className="w-6 absolute right-0 z-20" >
          {isHover && 
	<div>
	  <button onClick={handleAddOneBar}>
		<svg xmlns="http://www.w3.org/2000/svg" width="20" 
			height="20" viewBox="0 0 24 24" fill="none" 
			stroke="white" stroke-width="2" 
			stroke-linecap="round" stroke-linejoin="round" 
			class="lucide lucide-plus-circle"
		>
			<circle cx="12" cy="12" r="10">
			</circle>
			<line x1="12" x2="12" y1="8" y2="16">
			</line>
			<line x1="8" x2="16" y1="12" y2="12"></line>
		</svg>
          </button>
	  
	  <button onClick={handleAddOneBar}>
          	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
		stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
		<path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
		<line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
	  </button>
	  </div>
	  }
        </div>
        <div className="grid grid-cols-8 p-4 text-center text-teal-400">
          {noteBarList.map((noteBar, idx) => {
            return (
              <div key={idx}>
                <div className="grid grid-rows-6" key={idx}>
                  {noteBar.map((note, i) => {
                    return (
                      <div key={i}>
                          <div className="select-none text-sm">
                            <div className="relative translate-x-3 w-4 bg-slate-900 z-10">
                              <Formik
                                initialValues={{ note: note==-1 ? "" : note }}
                                onSubmit={async (values) => {
                                  updateNoteInDatatabs(values, i, idx, barnumber);
                                  await delay(2000);
                                  
                                  return true;
                                }}
                              >
                                {({ isSubmitting, submitForm }) => (
                                  <Form>
                                    <NoteInput name="note" id="note" disabled={isSubmitting} />
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
