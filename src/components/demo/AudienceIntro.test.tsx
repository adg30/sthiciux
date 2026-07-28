import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AudienceIntro } from './AudienceIntro'

describe('AudienceIntro', () => {
  it('explains the three Voucher principles and continues into the prototype', async () => {
    const onContinue = vi.fn()
    const user = userEvent.setup()

    render(<AudienceIntro onContinue={onContinue} />)

    expect(screen.getByText('Verified business trust')).toBeInTheDocument()
    expect(screen.getByText('Barangay supply signals')).toBeInTheDocument()
    expect(screen.getByText('Anonymous, consent-based exchange')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Explore Voucher' }))

    expect(onContinue).toHaveBeenCalledOnce()
  })
})
