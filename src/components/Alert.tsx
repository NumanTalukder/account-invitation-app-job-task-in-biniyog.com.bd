import React, { useState, useEffect } from 'react'

interface AlertProps {
  type: 'error' | 'warning' | 'success'
  title: string
  description: string
}

const Alert: React.FC<AlertProps> = ({ type, title, description }) => {
  const [isVisible, setIsVisible] = useState(true)

  // Function to hide the alert after a delay
  const hideAlert = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    const timeout = setTimeout(hideAlert, 4000) // 4 seconds

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const alertBackground =
    type === 'error'
      ? 'bg-red-100/20'
      : type === 'warning'
      ? 'bg-yellow-100/20'
      : 'bg-green-100/20'
  const errorTypeBackground =
    type === 'error'
      ? 'bg-red-500'
      : type === 'warning'
      ? 'bg-yellow-500'
      : 'bg-green-500'

  return (
    <div
      className={`flex items-center gap-3 w-[600px] mx-auto p-4 rounded border ${alertBackground} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity ease-in-out duration-300`}
    >
      <div
        className={`${errorTypeBackground} h-8 w-24 rounded-md flex items-center justify-center mr-4`}
      >
        <span className='text-white'>{type.toUpperCase()}</span>
      </div>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  )
}

export default Alert
