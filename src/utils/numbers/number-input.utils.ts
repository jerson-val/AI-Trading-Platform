import React from 'react'

export const preventInvalidNumberKeys = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  const allowedKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    '.',
  ]

  const isNumber =
    /^[0-9]$/.test(e.key)

  if (
    !isNumber &&
    !allowedKeys.includes(e.key)
  ) {
    e.preventDefault()
  }
}

export const restoreZeroIfEmpty = (
  value: number | string,
  callback: (
    value: string
  ) => void
) => {
  if (value === '') {
    callback('0')
  }
}