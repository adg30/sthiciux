import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DiscoverySearchPage } from './DiscoverySearchPage'

describe('DiscoverySearchPage', () => {
  it('keeps the trust tip collapsed by default and searchable', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <DiscoverySearchPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Trust-gated')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Bakit may hidden suppliers/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Bakit may hidden suppliers/i }))

    expect(
      screen.getByText(/Higher-access suppliers stay hidden until your trust is strong enough/i),
    ).toBeInTheDocument()
  })
})
