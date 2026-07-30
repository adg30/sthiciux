import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AudienceIntro } from './AudienceIntro'

describe('AudienceIntro', () => {
  it('explains the three KaUgnay principles and continues into the prototype', async () => {
    const onContinue = vi.fn()
    const user = userEvent.setup()

    render(<AudienceIntro onContinue={onContinue} />)

    expect(screen.getByText('Trust opens supply')).toBeInTheDocument()
    expect(screen.getByText('Check signals first')).toBeInTheDocument()
    expect(screen.getByText('Connect only with consent')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Enter KaUgnay' }))

    expect(onContinue).toHaveBeenCalledOnce()
  })
})
