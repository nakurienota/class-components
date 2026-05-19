import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from '../../../layout/about/AboutPage.tsx';

describe('AboutPage should render', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

  it('About should be rendered', () => {
    renderComponent();
    expect(screen.getByText('About page')).toBeInTheDocument();
  });
});