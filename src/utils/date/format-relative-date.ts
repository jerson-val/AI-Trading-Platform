export const formatSignalDate = (
  dateString: string
) => {
  const signalDate = new Date(
    dateString
  )

  const now = new Date()

  const diffInMs =
    now.getTime() -
    signalDate.getTime()

  const diffInMinutes = Math.floor(
    diffInMs / (1000 * 60)
  )

  const diffInHours = Math.floor(
    diffInMinutes / 60
  )

  // LESS THAN 1 HOUR
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${
      diffInMinutes !== 1
        ? 's'
        : ''
    } ago`
  }

  // LESS THAN 24 HOURS
  if (diffInHours < 24) {
    return `${diffInHours} hour${
      diffInHours !== 1
        ? 's'
        : ''
    } ago`
  }

  // MORE THAN 24 HOURS
  return signalDate.toLocaleDateString(
    'en-US',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  )
}