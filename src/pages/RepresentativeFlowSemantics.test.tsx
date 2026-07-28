import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PrototypeProvider } from '../context/PrototypeContext'
import { MeshBoardPage } from './mesh/MeshBoardPage'
import { ScarcityFlowPage } from './scarcity/ScarcityFlowPage'
import { VouchScorePage } from './VouchScorePage'

describe('Representative flow semantics', () => {
  it('frames the current Vouch Score as an access state, not a subscription tier', () => {
    render(
      <MemoryRouter>
        <PrototypeProvider>
          <VouchScorePage />
        </PrototypeProvider>
      </MemoryRouter>,
    )

    expect(screen.getByText('Current access state')).toBeInTheDocument()
    expect(screen.getByText('Score-driven')).toBeInTheDocument()
  })

  it('explains that scarcity signals must be verified before action', () => {
    render(
      <MemoryRouter>
        <ScarcityFlowPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Verify first')).toBeInTheDocument()
    expect(screen.getByText(/Reported shortages stay informational until Voucher verifies them/i)).toBeInTheDocument()
  })

  it('summarizes mesh relationship states without exposing identity by default', () => {
    render(
      <MemoryRouter>
        <MeshBoardPage />
      </MemoryRouter>,
    )

    const stateSection = screen.getByRole('region', { name: 'Read each supplier post by its consent state' })
    expect(within(stateSection).getByText('Relationship states')).toBeInTheDocument()
    expect(within(stateSection).getByText('Connected')).toBeInTheDocument()
    expect(within(stateSection).getByText('Pending')).toBeInTheDocument()
    expect(within(stateSection).getByText('Anonymous')).toBeInTheDocument()
  })
})
