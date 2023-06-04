import { useEffect, FC, useCallback } from 'react'
import { FormikValues, useFormikContext } from 'formik'
import { omit, isEqual } from 'lodash'

interface AutoSaveProps {
  delay?: number
  onSubmit?: (v: FormikValues) => void
}

const AutoSave: FC<AutoSaveProps> = ({ delay = 300, onSubmit }) => {
  const { values, errors, initialValues } = useFormikContext<FormikValues>()

  const isSameValueAsInitialValue = async (v: FormikValues) =>
    isEqual(v, initialValues)

  const onFormSubmit = useCallback(async () => {
    const v: FormikValues = omit(values, Object.keys(errors))
    if (onSubmit && !(await isSameValueAsInitialValue(v))) onSubmit(v)
  }, [values, initialValues, errors])

  // add delay of 300ms by default, or whatever delay prop is
  useEffect(() => {
    const timer = setTimeout(() => onFormSubmit(), delay)
    return () => clearTimeout(timer)
  }, [values, errors])

  return null
}

export default AutoSave
