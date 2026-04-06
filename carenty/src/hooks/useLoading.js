import { useState } from 'react'

export function useLoading() {
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')

  const withLoading = async (fn, text = 'Loading...') => {
    setLoadingText(text)
    setLoading(true)
    try {
      await fn()
    } finally {
      setLoading(false)
      setLoadingText('')
    }
  }

  return { loading, loadingText, withLoading }
}