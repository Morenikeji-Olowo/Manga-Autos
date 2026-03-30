import { useEffect, useState } from "react"
import { carsService } from "../services/carsService"

export function useCars(filters) {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    carsService.getCars(filters)
      .then(res => setCars(res.data))
      .finally(() => setLoading(false))
  }, [filters])

  return { cars, loading }
}