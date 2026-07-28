import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FlowContext } from '../../components/demo/FlowContext'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import styles from './DiscoverySearchPage.module.css'

const FILTERS = ['Inventory', 'Distance', 'Supplier']

export function DiscoverySearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (filter: string) => {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((candidate) => candidate !== filter)
        : [...current, filter],
    )
  }

  const handleSearch = () => {
    navigate('/discovery/results', { state: { query: query || 'suppliers' } })
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Discovery</h1>
      <FlowContext label="Trust-gated discovery">
        Supplier access depends on verified business trust, protecting both sides
        before identities are revealed.
      </FlowContext>

      <section className={`card ${styles.trustSummary}`} aria-labelledby="discovery-trust-summary">
        <div className={styles.trustHeader}>
          <StatusPill tone="trust">Trust-gated</StatusPill>
          <h2 id="discovery-trust-summary">Why some suppliers stay hidden</h2>
        </div>
        <p className={styles.trustLead}>
          Only verified trust unlocks higher-access supplier paths for your
          business.
        </p>
        <p className={styles.trustSupport}>
          Identities stay hidden until both sides agree to connect, so discovery
          begins with protected signals rather than exposed profiles.
        </p>
      </section>

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
          <button
            key={filter}
            type="button"
            className={`${styles.chip} ${activeFilters.includes(filter) ? styles['chip--active'] : ''}`}
            aria-pressed={activeFilters.includes(filter)}
            onClick={() => toggleFilter(filter)}
          >
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
