import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import styles from './MeshLogisticsPage.module.css'

export function MeshLogisticsPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const [pickup, setPickup] = useState('')
  const [time, setTime] = useState('')

  return (
    <div className="screen">
      <h1 className="screen-title">Arrange Logistics</h1>

      <div className="card">
        <label className={styles.label} htmlFor="pickup">
          How will you be receiving this?
        </label>
        <input
          id="pickup"
          className={styles.input}
          placeholder="Pickup location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
        <label className={styles.label} htmlFor="time">
          Time / Day
        </label>
        <input
          id="time"
          className={styles.input}
          placeholder="e.g. Tuesday 2:00 PM"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Button fullWidth onClick={() => navigate(`/mesh/complete/${itemId}`)}>
          Confirm Details
        </Button>
      </div>
    </div>
  )
}
