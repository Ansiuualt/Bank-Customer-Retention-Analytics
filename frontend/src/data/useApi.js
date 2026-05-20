import { useState, useEffect } from 'react'
import fallbackData from './fallbackData.json'

const API_BASE = '/api'

export function useApi() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/all`)
      .then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)
        return res.json()
      })
      .then(metrics => {
        console.log("Successfully connected to FastAPI backend. Loaded live metrics.")
        setData(metrics)
        setLoading(false)
      })
      .catch(err => {
        console.warn(`Could not connect to FastAPI backend (${err.message}). Falling back to static high-performance mock dataset.`)
        setData(fallbackData)
        setLoading(false)
      })
  }, [])

  return {
    kpis: data?.kpis ?? [],
    engagementData: data?.engagement ?? [],
    productDepthData: data?.products ?? [],
    geoData: data?.geography ?? [],
    rsiData: data?.rsi ?? {},
    pipelineStats: data?.pipeline ?? {},
    loading,
    error,
  }
}

