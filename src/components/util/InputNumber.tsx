import { useState } from 'react'

export function InputNumber ({
  value,
  onChange,
  className = ''
}: {
  value: number
  onChange: (value: number) => void
  className?: string
}): JSX.Element {
  const [inputValue, setInputValue] = useState(value.toString())

  const onBlurInput = (value: string): void => {
    const halfWidthValue = value.replace(/[０-９]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) - 65248)
    })
    const numberValue = halfWidthValue.replace(/[^0-9]/g, '')
    const newValue = numberValue === '' ? '0' : numberValue
    setInputValue(newValue)
    onChange(parseInt(newValue))
  }

  return (
    <input
      type='text'
      inputMode='numeric'
      className={className}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      onBlur={() => onBlurInput(inputValue)}
    />
  )
}
