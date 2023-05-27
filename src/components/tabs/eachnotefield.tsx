import {useState, useCallback, useMemo} from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { debounceAsync } from '@/components/tabs/debounceasync';
import AutoSave from '@/components/tabs/autosave';
import NoteInput from '@/components/tabs/noteinput';

import { type EachBarProps, EachTabProps } from '@/type/tabs';

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
  
export const EachBar = ({ noteBarList, isFirst }: EachBarProps) => {
    // console.log(noteBarList);
    // console.log(key);
    // return <div className='text-teal-400'>{JSON.stringify(noteBarList)}</div>
  
    const onSubmit = useCallback(async (values) => {
      console.log(values.note);
      // simulate http request
      await delay(2000);
  
      return true;
    }, []);
  
    const onSubmitDebounced = useMemo(() => {
      return debounceAsync(onSubmit, 400);
    }, [onSubmit]);
  
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
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
                          <div className="select-none bg-slate-900 text-sm">
                            <div className="relative translate-x-3 w-4 bg-slate-900 z-10">
                              <Formik
                                initialValues={{ note: note==-1 ? "" : note }}
                                onSubmit={async (values) => {
                                  console.log({ values });
                                  // simulate http request
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