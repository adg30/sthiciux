import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { MESH_ITEMS } from '../../data/constants'
import styles from './MeshLogisticsPage.module.css'

export function MeshLogisticsPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isExistingConnection = searchParams.get('existing') === '1'
  const item = MESH_ITEMS.find((candidate) => candidate.id === itemId) ?? MESH_ITEMS[0]
  const [pickup, setPickup] = useState('')
  const [time, setTime] = useState('')

  return (
    <div className="screen">
      <p className={`screen-kicker ${isExistingConnection ? 'screen-kicker--trust' : ''}`}>
        Logistics
      </p>
      <h1 className="screen-title">Arrange logistics</h1>

      <div className={`card ${styles.summary}`}>
        <div className={styles.summaryHeader}>
          <strong>{item.name}</strong>
          <StatusPill tone={isExistingConnection ? 'trust' : 'signal'}>
            {isExistingConnection ? 'Connected' : 'New exchange'}
          </StatusPill>
        </div>
        <dl className={styles.meta}>
          <div>
            <dt>Quantity</dt>
            <dd>{item.quantity}</dd>
          </div>
          <div>
            <dt>Needed by</dt>
            <dd>{item.neededBy}</dd>
          </div>
          <div>
            <dt>Exchange type</dt>
            <dd>{item.exchangeType}</dd>
          </div>
          <div>
            <dt>Partner</dt>
            <dd>{isExistingConnection ? item.business : 'Protected until acceptance'}</dd>
          </div>
        </dl>
      </div>

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
          required
        />
        <label className={styles.label} htmlFor="time">
          Time / day
        </label>
        <input
          id="time"
          className={styles.input}
          placeholder={`e.g. ${item.neededBy}`}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <div className={styles.footer}>
        <Button
          fullWidth
          disabled={!pickup.trim() || !time.trim()}
          onClick={() =>
            navigate(`/mesh/complete/${itemId}${isExistingConnection ? '?existing=1' : ''}`)
          }
        >
          Confirm details
        </Button>
      </div>
    </div>
  )
}
