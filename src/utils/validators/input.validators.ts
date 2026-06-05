export const validateRequired = (
  value: string,
  fieldName: string
): string => {
  if (!value.trim()) {
    return `${fieldName} is required`
  }

  return ''
}

export const validateEmail = (
  email: string
): string => {
  if (!email.trim()) {
    return 'Email is required'
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    )
  ) {
    return 'Invalid email format'
  }

  return ''
}

export const validatePassword = (
  password: string,
  minLength = 6
): string => {
  if (!password.trim()) {
    return 'Password is required'
  }

  if (
    password.length < minLength
  ) {
    return `Password must be at least ${minLength} characters`
  }

  return ''
}

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!confirmPassword.trim()) {
    return 'Please confirm your password'
  }

  if (
    password !== confirmPassword
  ) {
    return 'Passwords do not match'
  }

  return ''
}

export const validateFullName = (
  fullName: string
): string => {
  return validateRequired(
    fullName,
    'Full name'
  )
}