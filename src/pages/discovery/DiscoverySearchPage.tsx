import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import styles from './DiscoverySearchPage.module.css'

const FILTERS = ['Inventory', 'Distance', 'Supplier']

export function DiscoverySearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    navigate('/discovery/results', { state: { query: query || 'suppliers' } })
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Discovery</h1>

      <label className="sr-only" htmlFor="supplier-search">
        Search suppliers and services
      </label>
      <input
        id="supplier-search"
        type="search"
        className={styles.search}
        placeholder="Search suppliers and services"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />

      <div className={styles.filters} role="group" aria-label="Search filters">
        {FILTERS.map((filter) => (
          <button key={filter} type="button" className={styles.chip}>
            {filter}
          </button>
        ))}
      </div>

      <div className={`card card--dashed ${styles.recent}`}>
        <h2 className={styles.recentTitle}>Recent Searches</h2>
        <p className={styles.recentPlaceholder}>Cooking oil suppliers nearby</p>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Button fullWidth onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  )
}
