import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FlowContext } from './FlowContext'

describe('FlowContext', () => {
  it('labels and explains a flow without hiding its meaning in decoration', () => {
    render(
      <FlowContext label="Why trust matters">
        Supplier access depends on verified business trust.
      </FlowContext>,
    )

    expect(screen.getByText('Why trust matters')).toBeInTheDocument()
    expect(
      screen.getByText('Supplier access depends on verified business trust.'),
    ).toBeInTheDocument()
  })
})
