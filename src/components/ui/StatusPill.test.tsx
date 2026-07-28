import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatusPill } from './StatusPill'

describe('StatusPill', () => {
  it('renders a semantic status label and optional assistive context', () => {
    render(
      <StatusPill tone="trust" assistiveLabel="Trust status">
        High-Trust
      </StatusPill>,
    )

    expect(screen.getByText('High-Trust')).toBeInTheDocument()
    expect(screen.getByLabelText('Trust status: High-Trust')).toBeInTheDocument()
  })

  it('renders destructive states without requiring assistive context', () => {
    render(<StatusPill tone="critical">Critical</StatusPill>)

    expect(screen.getByText('Critical')).toBeInTheDocument()
  })
})
