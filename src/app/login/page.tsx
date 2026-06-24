'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/src/store/auth.store'
import { Eye, EyeOff } from 'lucide-react'
import { validateEmail, validatePassword } from '@/src/utils/validators/input.validators'
import { login as loginCall } from '@/src/services/auth/auth.service'
import { useLoaderStore } from '@/src/store/loader.store'

export default function LoginPage() {
  const router = useRouter()

  const login = useAuthStore(
    (state) => state.login
  )

  const showLoader = useLoaderStore(
    (state) => state.show
  )

  const hideLoader = useLoaderStore(
    (state) => state.hide
  )

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] =
    useState(false)

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    }

    setErrors(newErrors)

    return !Object.values(
      newErrors
    ).some(Boolean)
  }

  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    try {
      showLoader()

      const data = await loginCall(
        email,
        password
      );

      login(data);

      hideLoader();

      toast.success('Login successful');

      router.replace('/dashboard');

    } catch (error: any) {
      hideLoader()

      if (error.response?.status === 401) {
        toast.error('Invalid credentials')
      } else {
        toast.error('Something went wrong')
      }

    } 
  }

  return (

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
                  onBlur={() =>
                    setErrors((prev) => ({
                      ...prev,
                      email: validateEmail(email),
                    }))
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

                <div className="relative">
                  <input
                    type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)

                    setErrors((prev) => ({
                      ...prev,
                      password: '',
                    }))
                  }}
                  onBlur={() =>
                    setErrors((prev) => ({
                      ...prev,
                      password:
                        validatePassword(password),
                    }))
                  }
                  className={`w-full rounded-xl border bg-[#1f2937] px-4 py-3 outline-none transition ${
                    errors.password
                      ? 'border-red-500'
                      : 'border-gray-700 focus:border-blue-500'
                  }`}
                  placeholder="Enter your password"
                  />

                  <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                </div>

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

  )
}