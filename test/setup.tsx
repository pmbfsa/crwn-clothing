import '@testing-library/jest-dom/vitest';

// Stripe
export const mockConfirmCardPayment = vi.fn();
export const mockGetElement = vi.fn();

type MockStripeReturn = {
  confirmCardPayment: typeof mockConfirmCardPayment;
} | null;

export const mockUseStripe = vi.fn<() => MockStripeReturn>(() => ({
  confirmCardPayment: mockConfirmCardPayment,
}));

type MockElementsReturn = {
  getElement: typeof mockGetElement;
} | null;

export const mockUseElements = vi.fn<() => MockElementsReturn>(() => ({
  getElement: mockGetElement,
}));

vi.mock('@stripe/react-stripe-js', () => ({
  CardElement: () => <div data-testid="card-element" />,
  useStripe: mockUseStripe,
  useElements: mockUseElements,
}));

// Firebase
export const mockFirebase = {
  initializeApp: vi.fn(),
  getAuth: vi.fn(() => ({ name: 'mock-auth' })),
  signInWithPopup: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  setCustomParameters: vi.fn(),
  getFirestore: vi.fn(() => ({ name: 'mock-db' })),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  collection: vi.fn(),
  writeBatch: vi.fn(),
  query: vi.fn(),
  getDocs: vi.fn(),
};

vi.mock('firebase/app', () => ({
  initializeApp: mockFirebase.initializeApp,
}));

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/auth')>();

  return {
    ...actual,
    GoogleAuthProvider: class {
      setCustomParameters = mockFirebase.setCustomParameters;
    },
    getAuth: mockFirebase.getAuth,
    signInWithPopup: mockFirebase.signInWithPopup,
    createUserWithEmailAndPassword: mockFirebase.createUserWithEmailAndPassword,
    signInWithEmailAndPassword: mockFirebase.signInWithEmailAndPassword,
    signOut: mockFirebase.signOut,
    onAuthStateChanged: mockFirebase.onAuthStateChanged,
  };
});

vi.mock('firebase/firestore', () => ({
  getFirestore: mockFirebase.getFirestore,
  doc: mockFirebase.doc,
  getDoc: mockFirebase.getDoc,
  setDoc: mockFirebase.setDoc,
  collection: mockFirebase.collection,
  writeBatch: mockFirebase.writeBatch,
  query: mockFirebase.query,
  getDocs: mockFirebase.getDocs,
}));
