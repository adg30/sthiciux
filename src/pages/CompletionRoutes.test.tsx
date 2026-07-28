import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PrototypeProvider } from '../context/PrototypeContext'
import { STABILIZING_DELAY_MS } from '../data/constants'
import { ScarcityFlowPage } from './scarcity/ScarcityFlowPage'
import { VouchScorePage } from './VouchScorePage'

function renderRoute(element: React.ReactNode) {
  return render(
    <MemoryRouter initialEntries={['/feature']}>
      <PrototypeProvider>
        <Routes>
          <Route path="/feature" element={element} />
          <Route path="/" element={<div>Dashboard destination</div>} />
        </Routes>
      </PrototypeProvider>
    </MemoryRouter>,
  )
}

afterEach(() => {
  vi.useRealTimers()
})

describe('flow completion routes', () => {
  it('returns to the Dashboard from Vouch Score without replacing its primary action', async () => {
    const user = userEvent.setup()
    renderRoute(<VouchScorePage />)

    expect(screen.getByRole('button', { name: 'View Vouch Action List' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Return to Dashboard' }))

    expect(screen.getByText('Dashboard destination')).toBeInTheDocument()
  })

  it('returns to the Dashboard from the verified scarcity result', async () => {
    vi.useFakeTimers()
    renderRoute(<ScarcityFlowPage />)

    fireEvent.click(screen.getByRole('button', { name: 'Inspect critical scarcity epicenter' }))
    act(() => {
      vi.advanceTimersByTime(STABILIZING_DELAY_MS)
    })

    fireEvent.click(screen.getByRole('button', { name: 'Return to Dashboard' }))

    expect(screen.getByText('Dashboard destination')).toBeInTheDocument()
  })
})
