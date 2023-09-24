import React from 'react'
import { useTranslation } from 'react-i18next'
import { MapBlockData, createMapDataFromFill } from '../lib/convertToObject'
import { ErrorType } from '../lib/i18n'
import Alert from './Alert'

interface InputFillCommandProps {
  onDisplayMapTable: (mapBlockData: MapBlockData) => void
}

function InputFillCommand ({
  onDisplayMapTable: onInputFillCommand
}: InputFillCommandProps): JSX.Element {
  const [fillCommand, setFillCommand] = React.useState('')
  const [errorMessages, setErrorMessages] = React.useState<ErrorType[]>(
    []
  )
  const { t } = useTranslation()

  const onClickSend = (): void => {
    try {
      const format = createMapDataFromFill(fillCommand)
      onInputFillCommand(format)
    } catch (e) {
      if (e instanceof Error) {
        const errorMessage = e.message
        switch (errorMessage) {
          case 'The command is invalid.':
            setErrorMessages([...errorMessages, 'invalidFillCommand'])
            break
          case 'The command is not fill command.':
            setErrorMessages([...errorMessages, 'notFillCommand'])
            break
          default:
            throw new Error(`unhandled error: ${errorMessage}`)
        }
        return
      }
      setErrorMessages([...errorMessages, 'unknownError'])
    }
  }

  return (
    <div>
      <p>{t('tableTitle')}</p>
      <div className='m-3'>
        {
          errorMessages.map((errorMessage, index) => (
            <Alert
              key={index}
              variant='danger'
              dismissible
            >
              {t(`errorMessage.${errorMessage}`)}
            </Alert>
          ))
        }
        <label htmlFor='fillCommand' className='form-label'>
          {t('inputFill.header')}
        </label>
        <textarea
          id='fillCommand'
          className='form-control'
          rows={10}
          value={fillCommand}
          onChange={e => setFillCommand(e.target.value)}
        />
      </div>
      <button type='button' className='btn btn-primary m-3' onClick={onClickSend}>
        {t('inputFill.send')}
      </button>
    </div>
  )
}
export default InputFillCommand
