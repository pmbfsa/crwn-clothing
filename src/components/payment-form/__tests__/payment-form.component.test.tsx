import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import {
  mockUseStripe,
  mockUseElements,
  mockConfirmCardPayment,
  mockGetElement,
} from '../../../../test/setup';

import PaymentForm from '../payment-form.component';

describe('PaymentForm component', () => {
  globalThis.fetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the payment form', () => {
    renderWithProviders(<PaymentForm />);

    const paymentFormElement = screen.getByTestId('payment-form');
    expect(paymentFormElement).toBeInTheDocument();

    const cardElement = screen.getByTestId('card-element');
    expect(cardElement).toBeInTheDocument();

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeInTheDocument();
  });

  it('should do nothing if stripe is not loaded', async () => {
    mockUseStripe.mockReturnValueOnce(null);

    renderWithProviders(<PaymentForm />);

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeEnabled();
  });

  it('should do nothing if elements is not loaded', async () => {
    mockUseElements.mockReturnValueOnce(null);

    renderWithProviders(<PaymentForm />);

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeEnabled();
  });

  it('should handle errors when the payment intent call fails ', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Error occurred!'));

    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithProviders(<PaymentForm />);

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeEnabled();
  });

  it('should handle errors when the payment intent response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 999,
      text: 'Teste',
    });

    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    renderWithProviders(<PaymentForm />);

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeEnabled();
  });

  it('should do nothing if card is no valid', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        paymentIntent: { client_secret: 'client_secret' },
      }),
    });

    mockGetElement.mockReturnValueOnce(null);

    renderWithProviders(<PaymentForm />);

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(mockConfirmCardPayment).not.toHaveBeenCalled();
    });

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeEnabled();
  });

  it('should call payment intent and reject payment when credit card is not accepted on submit', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        paymentIntent: { client_secret: 'client_secret' },
      }),
    });

    mockConfirmCardPayment.mockReturnValue({
      error: 'No credit available',
    });

    window.alert = vi.fn();

    renderWithProviders(<PaymentForm />);

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(mockConfirmCardPayment).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith('No credit available');

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeEnabled();
  });

  it('should call payment intent and alert about payment status if not succeedded on submit', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        paymentIntent: { client_secret: 'client_secret' },
      }),
    });

    mockConfirmCardPayment.mockReturnValue({
      paymentIntent: { status: 'processing' },
    });

    window.alert = vi.fn();

    renderWithProviders(<PaymentForm />);

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(mockConfirmCardPayment).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith('processing');

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeEnabled();
  });

  it('should call payment intent and confirm payment on submit', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        paymentIntent: { client_secret: 'client_secret' },
      }),
    });

    mockConfirmCardPayment.mockReturnValue({
      paymentIntent: { status: 'succeeded' },
    });

    window.alert = vi.fn();

    renderWithProviders(<PaymentForm />);

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(mockConfirmCardPayment).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith('Payment Successful!');

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeEnabled();
  });

  it('should call payment intent and confirm payment on submit with currentUser', async () => {
    const mockCurrentUser = {
      id: '1',
      createdAt: Date.toString(),
      displayName: 'Teste',
      email: 'teste@teste.com',
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        paymentIntent: { client_secret: 'client_secret' },
      }),
    });

    mockConfirmCardPayment.mockReturnValue({
      paymentIntent: { status: 'succeeded' },
    });

    window.alert = vi.fn();

    renderWithProviders(<PaymentForm />, {
      preloadedState: {
        user: { currentUser: mockCurrentUser, isLoading: false, error: null },
      },
    });

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(mockConfirmCardPayment).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith('Payment Successful!');

    const paymentButtonElement = screen.getByRole('button');
    expect(paymentButtonElement).toBeEnabled();
  });
});
