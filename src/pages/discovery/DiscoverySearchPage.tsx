import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { SignalTip } from '../../components/ui/SignalTip'
import { RECENT_SEARCHES } from '../../data/constants'
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

  const handleSearch = (searchQuery?: string) => {
    navigate('/discovery/results', { state: { query: (searchQuery ?? query) || 'suppliers' } })
  }

  return (
    <div className="screen">
      <p className="screen-kicker screen-kicker--trust">Trust-gated</p>
      <h1 className="screen-title">Discovery</h1>

      <SignalTip label="Bakit may hidden suppliers?">
        <p>
          Higher-access suppliers stay hidden until your trust is strong enough.
          Identities appear only after both sides agree.
        </p>
      </SignalTip>

      <div className={styles.searchWrap}>
        <label className="sr-only" htmlFor="supplier-search">
          Search suppliers and services
        </label>
        <span className={styles.searchIcon} aria-hidden="true">
          ⌕
        </span>
        <input
          id="supplier-search"
          type="search"
          className={styles.search}
          placeholder="Search suppliers"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

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

      <div className={`card ${styles.recent}`}>
        <h2 className={styles.recentTitle}>Recent</h2>
        <ul className={styles.recentList}>
          {RECENT_SEARCHES.map((term) => (
            <li key={term}>
              <button
                type="button"
                className={styles.recentItem}
                onClick={() => {
                  setQuery(term)
                  handleSearch(term)
                }}
              >
                {term}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.actions}>
        <Button fullWidth onClick={() => handleSearch()}>
          Search
        </Button>
      </div>
    </div>
  )
}
