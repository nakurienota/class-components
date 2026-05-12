import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Spinner from '../../../components/spinner/Spinner';

describe('Spinner', () => {
  it('renders spinner', () => {
    render(<Spinner />);

    expect(screen.getByText('Imitating loading...')).toBeInTheDocument();
  });
});