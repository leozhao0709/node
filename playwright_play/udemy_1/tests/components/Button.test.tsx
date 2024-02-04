import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Button from '@/components/Button';

describe('Button', () => {
  it('should render Button', async () => {
    const onClick = vi.fn();
    const { container } = render(<Button onClick={onClick}>button</Button>);

    expect(container.querySelector('button')).toBeVisible();

    await userEvent.click(container.querySelector('button')!);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
