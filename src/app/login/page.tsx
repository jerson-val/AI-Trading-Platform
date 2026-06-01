'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/src/store/auth.store'
import FullscreenLoader from '@/src/components/ui/fullscreen-loader'

export default function LoginPage() {
  const router = useRouter()

  const login = useAuthStore(
    (state) => state.login
  )

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    }

    let isValid = true

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
    } else if (password.length < 3) {
      newErrors.password =
        'Password must be at least 3 characters'

      isValid = false
    }

    setErrors(newErrors)

    return isValid
  }

  const handleLogin = async () => {

    if (!validateForm()) return

    try {
      setLoading(true)

      // MOCK API DELAY
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      )

      // to do after login:
      /*
        JWT token
        refresh token
        user info
      */ 

      if (
        email === '1@1.com' &&
        password === '123'
      ) {
        login(
          {
            id: '1',
            email,
          },
          'mock-jwt-token'
        )

        toast.success(
          'Login successful'
        )

        router.replace('/dashboard')
      } else {
        toast.error(
          'Invalid credentials'
        )
      }
      setLoading(false)
    } catch (error) {
      console.error(error)

      toast.error(
        'Something went wrong'
      )
      setLoading(false)
    } 
  }

  return (
    <>
    {loading && <FullscreenLoader />}

      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-5"
        style={{
          backgroundImage:
            "url('/images/auth-bg.png')",
        }}>

        <div className="absolute inset-0 bg-black/70 backdrop-blur-[4px]" />
        
          <div className=" relative z-10 w-full max-w-md rounded-2xl border border-gray-800 bg-[#111827] p-8 shadow-[0_0_40px_rgba(37,99,235,0.25)]">
          <h1 className="mb-8 text-center text-4xl font-extrabold tracking-wide text-blue-400">
            SMC AI
          </h1>

          <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
          className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)

                  setErrors((prev) => ({
                    ...prev,
                    email: '',
                  }))
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value)

                  setErrors((prev) => ({
                    ...prev,
                    password: '',
                  }))
                }}
                className={`w-full rounded-xl border bg-[#1f2937] px-4 py-3 outline-none transition ${
                  errors.password
                    ? 'border-red-500'
                    : 'border-gray-700 focus:border-blue-500'
                }`}
                placeholder="Enter your password"
              />

              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 font-semibold transition hover:scale-[1.01] hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50"
            >
              Login
            </button>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{' '}

              <button
                type='button'
                onClick={() =>
                  router.push('/register')
                }
                className="font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
              >
                Register
              </button>
            </div>

          </form>
        </div>

      </div>
    </>
  )
}