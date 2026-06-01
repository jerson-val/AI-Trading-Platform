'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import FullscreenLoader from '@/src/components/ui/fullscreen-loader'

export default function RegisterPage() {
  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [fullName, setFullName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('')

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    })


const validateForm = () => {
    const newErrors = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    let isValid = true

    // FULL NAME
    if (!fullName.trim()) {
        newErrors.fullName =
        'Full name is required'

        isValid = false
    }

    // EMAIL
    if (!email.trim()) {
        newErrors.email =
        'Email is required'

        isValid = false
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
        )
    ) {
        newErrors.email =
        'Invalid email format'

        isValid = false
    }

    // PASSWORD
    if (!password.trim()) {
        newErrors.password =
        'Password is required'

        isValid = false
    } else if (password.length < 6) {
        newErrors.password =
        'Password must be at least 6 characters'

        isValid = false
    }

    // CONFIRM PASSWORD
    if (!confirmPassword.trim()) {
        newErrors.confirmPassword =
        'Please confirm your password'

        isValid = false
    } else if (
        password !== confirmPassword
    ) {
        newErrors.confirmPassword =
        'Passwords do not match'

        isValid = false
    }

    setErrors(newErrors)

    return isValid
    }

  const handleRegister = async () => {

    if (!validateForm()) return

    try {
      if (
        !fullName ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        toast.error(
          'Please complete all fields'
        )

        return
      }

      if (
        password !== confirmPassword
      ) {
        toast.error(
          'Passwords do not match'
        )

        return
      }

      setLoading(true)

      // MOCK API DELAY
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      )

      toast.success(
        'Account created successfully'
      )

      router.replace('/login')
    } catch (error) {
      console.error(error)

      toast.error(
        'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && (
        <FullscreenLoader />
      )}

      <div className="relative min-h-screen overflow-y-auto bg-cover bg-center bg-no-repeat p-5"
        style={{
          backgroundImage:
            "url('/images/auth-bg.png')",
        }}>

        <div className="absolute inset-0 bg-black/70 backdrop-blur-[4px]" />

        <div className="relative z-10 flex justify-center py-10">
          <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#111827] p-8 shadow-[0_0_40px_rgba(37,99,235,0.25)]">
            <h1 className="mb-8 text-center text-3xl font-bold text-blue-400">
              Create Account
            </h1>

            <form
              onSubmit={(e) => {
                  e.preventDefault()
                  handleRegister()
              }}
            
            className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Full Name
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  className={`w-full rounded-xl border bg-[#1f2937] px-4 py-3 outline-none transition ${
                      errors.fullName
                          ? 'border-red-500'
                          : 'border-gray-700 focus:border-blue-500'
                      }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-400">
                      {errors.fullName}
                  </p>
                  )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className={`w-full rounded-xl border bg-[#1f2937] px-4 py-3 outline-none transition ${
                      errors.email
                          ? 'border-red-500'
                          : 'border-gray-700 focus:border-blue-500'
                      }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">
                      {errors.email}
                  </p>
                  )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className={`w-full rounded-xl border bg-[#1f2937] px-4 py-3 outline-none transition ${
                      errors.password
                          ? 'border-red-500'
                          : 'border-gray-700 focus:border-blue-500'
                      }`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">
                      {errors.password}
                  </p>
                  )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className={`w-full rounded-xl border bg-[#1f2937] px-4 py-3 outline-none transition ${
                      errors.confirmPassword
                          ? 'border-red-500'
                          : 'border-gray-700 focus:border-blue-500'
                      }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">
                      {errors.confirmPassword}
                  </p>
                  )}
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-blue-600 font-semibold transition hover:scale-[1.01] hover:bg-blue-500 active:scale-[0.99]"
              >
                Create Account
              </button>

              <div className="text-center text-sm text-gray-400">
                  Already have an account?{' '}

                  <button
                      type='button'
                      onClick={() =>
                      router.push('/login')
                      }
                      className="font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
                  >
                      Login
                  </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </>
  )
}