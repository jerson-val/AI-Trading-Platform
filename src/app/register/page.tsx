'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'
import { validateConfirmPassword, validateEmail, validateFullName, validatePassword } from '@/src/utils/validators/input.validators'
import { register } from '@/src/services/auth/auth.service'
import { useAuthStore } from '@/src/store/auth.store'
import { useLoaderStore } from '@/src/store/loader.store'

export default function RegisterPage() {
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

  const [showPassword, setShowPassword] =
    useState(false)

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false)


  const validateForm = () => {
    const newErrors = {
      fullName:
        validateFullName(fullName),

      email:
        validateEmail(email),

      password:
        validatePassword(password),

      confirmPassword:
        validateConfirmPassword(
          password,
          confirmPassword
        ),
    }

    setErrors(newErrors)

    return !Object.values(
      newErrors
    ).some(Boolean)
  }

  const handleRegister = async () => {

    if (!validateForm()) {
      return
    }

    try {

      showLoader()

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const response = await register(
        fullName,
        email,
        password,
        timeZone
      );  

      login(response);

      hideLoader()

      toast.success(
        'Account created successfully'
      )

      router.replace('/dashboard')

    } catch (error: any) {
      hideLoader()

      if (error.response?.status === 400) {
        toast.error('This email is already registered')
      } else {
        toast.error('Something went wrong')
      }

    }
  }

  return (

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
                    onChange={(e) => {
                      setFullName(e.target.value)

                      setErrors((prev) => ({
                        ...prev,
                        fullName: '',
                      }))
                    }}
                    onBlur={() =>
                      setErrors((prev) => ({
                        ...prev,
                        fullName:
                          validateFullName(fullName),
                      }))
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
                      onChange={(e) =>{
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
                      className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 pr-12 outline-none transition focus:border-blue-500"
                      placeholder="Create a password"
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

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showConfirmPassword
                          ? 'text'
                          : 'password'
                      }
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)

                        setErrors((prev) => ({
                          ...prev,
                          confirmPassword: '',
                        }))
                      }}
                      onBlur={() =>
                        setErrors((prev) => ({
                          ...prev,
                          confirmPassword:
                            validateConfirmPassword(password, confirmPassword),
                        }))
                      }
                      className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 pr-12 outline-none transition focus:border-blue-500"
                      placeholder="Confirm your password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
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
  )
}