import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DiscoverySearchPage } from './DiscoverySearchPage'

describe('DiscoverySearchPage', () => {
  it('explains the trust gate and hidden identity before search begins', () => {
    render(
      <MemoryRouter>
        <DiscoverySearchPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Trust-gated')).toBeInTheDocument()
    expect(screen.getByText(/Only verified trust unlocks higher-access supplier paths/i)).toBeInTheDocument()
    expect(screen.getByText(/Identities stay hidden until both sides agree to connect/i)).toBeInTheDocument()
  })
})
