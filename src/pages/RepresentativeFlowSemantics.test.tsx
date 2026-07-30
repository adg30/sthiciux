import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PrototypeProvider } from '../context/PrototypeContext'
import { MeshBoardPage } from './mesh/MeshBoardPage'
import { ScarcityFlowPage } from './scarcity/ScarcityFlowPage'
import { VouchScorePage } from './VouchScorePage'

describe('Representative flow semantics', () => {
  function renderVouchScorePage(preset?: 'restricted' | 'limited' | 'full') {
    if (preset) {
      localStorage.setItem('kaugnay-prototype-preset', preset)
    } else {
      localStorage.removeItem('kaugnay-prototype-preset')
      localStorage.removeItem('voucher-prototype-preset')
    }

    return render(
      <MemoryRouter>
        <PrototypeProvider>
          <VouchScorePage />
        </PrototypeProvider>
      </MemoryRouter>,
    )
  }

  it('frames the current Vouch Score as an access state, not a subscription tier', () => {
    renderVouchScorePage()

    expect(screen.getByRole('heading', { name: 'Access Capabilities' })).toBeInTheDocument()
    expect(screen.getByText('Next Threshold')).toBeInTheDocument()
    expect(screen.getByText('RESTRICTED')).toBeInTheDocument()
    expect(screen.getByText('0 of 8 capabilities unlocked')).toBeInTheDocument()
  })

  it('shows the terminal Vouch Score state as fully unlocked Premium access', () => {
    renderVouchScorePage('full')

    expect(screen.getByText('All thresholds unlocked')).toBeInTheDocument()
    expect(screen.getByText('FULL ACCESS')).toBeInTheDocument()
    expect(screen.getByText('8 of 8 capabilities unlocked')).toBeInTheDocument()
    expect(screen.getByText('Premium')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Generate Trust Card' })).toBeInTheDocument()
  })

  it('keeps the supply signal calm and asks users to stabilize before acting', () => {
    render(
      <MemoryRouter>
        <PrototypeProvider>
          <ScarcityFlowPage />
        </PrototypeProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Barangay Supply Signal' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Stabilize Signal' })).toBeInTheDocument()
    expect(screen.getByText(/Tap the center to stabilize/i)).toBeInTheDocument()
  })

  it('updates the live item label when a different resource is selected', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <PrototypeProvider>
          <ScarcityFlowPage />
        </PrototypeProvider>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Packaging' }))

    expect(screen.getByText(/Packaging · live barangay telemetry/i)).toBeInTheDocument()
    expect(screen.getByText(/4 reports/i)).toBeInTheDocument()
  })

  it('shows mesh posts with relationship cues without a long instruction block', () => {
    render(
      <MemoryRouter>
        <PrototypeProvider>
          <MeshBoardPage />
        </PrototypeProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Barangay Supply Mesh' })).toBeInTheDocument()
    expect(screen.getAllByText('Connected').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Anonymous').length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: /Paano basahin ang nodes/i })).toBeInTheDocument()
  })
})
