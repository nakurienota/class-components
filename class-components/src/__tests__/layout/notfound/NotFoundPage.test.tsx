import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../../layout/notfound/NotFoundPage.tsx';
import { MemoryRouter } from 'react-router-dom';

describe('NotFoundPage should render', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

  it('404 should be rendered', () => {
    renderComponent();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toBeInTheDocument();
  });
});