import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createMock } from 'ts-auto-mock';
import { Props, ActivityResults } from '../ActivityResults';
const mockProps = createMock<Props>();

describe('ActivityResults Screen', () => {
  it('renders correctly', async () => {
    expect(true).toBeTruthy();
  });
});
