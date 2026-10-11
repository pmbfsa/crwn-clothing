import { mockFirebase } from '../../../../test/setup';

import {
  googleProvider,
  auth,
  signInWithGooglePopup,
  createUserAuthWithEmailAndPassword,
  signInAuthWithEmailAndPassword,
  signOutUser,
  onAuthStateChangedListener,
  getCurrentUser,
  db,
  createUserDocumentFromAuth,
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from '../firebase.utils';

describe('Firebase utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signInWithGooglePopup', () => {
    it('should call signInWithPopup with auth and googleProvider', async () => {
      await signInWithGooglePopup();

      expect(mockFirebase.signInWithPopup).toHaveBeenCalledWith(
        auth,
        googleProvider,
      );
    });
  });

  describe('createUserAuthWithEmailAndPassword', () => {
    it('should do nothing if email or password is empty', async () => {
      expect(
        await createUserAuthWithEmailAndPassword('teste@teste.com', ''),
      ).toBeUndefined();

      expect(
        await createUserAuthWithEmailAndPassword('', '1234'),
      ).toBeUndefined();

      expect(
        mockFirebase.createUserWithEmailAndPassword,
      ).not.toHaveBeenCalled();
    });

    it('should call createUserWithEmailAndPassword with auth, email and password', async () => {
      const mockUserCredential = { user: { uid: '1' } };
      mockFirebase.createUserWithEmailAndPassword.mockResolvedValue(
        mockUserCredential,
      );

      const userCredential = await createUserAuthWithEmailAndPassword(
        'teste@teste.com',
        '1234',
      );

      expect(mockFirebase.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'teste@teste.com',
        '1234',
      );

      expect(userCredential).toEqual(mockUserCredential);
    });
  });

  describe('signInAuthWithEmailAndPassword', () => {
    it('should do nothing if email or password is empty', async () => {
      expect(
        await signInAuthWithEmailAndPassword('teste@teste.com', ''),
      ).toBeUndefined();

      expect(await signInAuthWithEmailAndPassword('', '1234')).toBeUndefined();

      expect(mockFirebase.signInWithEmailAndPassword).not.toHaveBeenCalled();
    });

    it('should call signInWithEmailAndPassword with auth, email and password', async () => {
      const mockUserCredential = { user: { uid: '1' } };
      mockFirebase.signInWithEmailAndPassword.mockResolvedValue(
        mockUserCredential,
      );

      const userCredential = await signInAuthWithEmailAndPassword(
        'teste@teste.com',
        '1234',
      );

      expect(mockFirebase.signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'teste@teste.com',
        '1234',
      );

      expect(userCredential).toEqual(mockUserCredential);
    });
  });

  describe('signOutUser', () => {
    it('should call signOut with auth', async () => {
      await signOutUser();
      expect(mockFirebase.signOut).toHaveBeenCalledWith(auth);
    });
  });

  describe('onAuthStateChangedListener', () => {
    it('should register the callback on onAuthStateChanged', () => {
      const mockCallback = vi.fn();

      onAuthStateChangedListener(mockCallback);

      expect(mockFirebase.onAuthStateChanged).toHaveBeenCalledWith(
        auth,
        mockCallback,
      );
    });
  });

  describe('getCurrentUser', () => {
    it('should resolve with user and unsubscribe from listener', async () => {
      const mockUser = { uid: '1' };
      const mockUnsubscribe = vi.fn();

      mockFirebase.onAuthStateChanged.mockImplementation(
        (_auth, nextOrObserver) => {
          Promise.resolve().then(() => nextOrObserver(mockUser));
          return mockUnsubscribe;
        },
      );

      await expect(getCurrentUser()).resolves.toBe(mockUser);
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });

    it('should reject on error from listener', async () => {
      const mockError = new Error('Listener error');

      mockFirebase.onAuthStateChanged.mockImplementation(
        (_auth, _nextOrObserver, errorFn) => {
          Promise.resolve().then(() => errorFn(mockError));
          return vi.fn();
        },
      );

      await expect(getCurrentUser()).rejects.toBe(mockError);
    });
  });

  describe('createUserDocumentFromAuth', () => {
    const mockUserAuth = {
      uid: '1',
      displayName: 'teste',
      email: 'teste@teste.com',
    };

    const mockDocRef = '1';

    it('should do nothing when there is no userAuth', async () => {
      expect(
        await createUserDocumentFromAuth(undefined as never),
      ).toBeUndefined();

      expect(mockFirebase.getDoc).not.toHaveBeenCalled();
    });

    it('should return the existing snapshot without setting a new one', async () => {
      const mockUserSnapshot = { exists: () => true };

      mockFirebase.doc.mockImplementation(() => mockDocRef);
      mockFirebase.getDoc.mockResolvedValue(mockUserSnapshot);

      const userSnapshot = await createUserDocumentFromAuth(
        mockUserAuth as never,
      );

      expect(mockFirebase.doc).toHaveBeenCalledWith(
        db,
        'users',
        mockUserAuth.uid,
      );

      expect(mockFirebase.getDoc).toHaveBeenCalledWith(mockDocRef);
      expect(mockFirebase.setDoc).not.toHaveBeenCalled();
      expect(userSnapshot).toEqual(mockUserSnapshot);
    });

    it('should log on console and return original snapshot on error setting a new one', async () => {
      const mockUserSnapshot = { exists: () => false };
      const mockError = new Error('Set new snapshot error');

      mockFirebase.doc.mockImplementation(() => mockDocRef);
      mockFirebase.getDoc.mockResolvedValue(mockUserSnapshot);
      mockFirebase.setDoc.mockRejectedValue(mockError);

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const userSnapshot = await createUserDocumentFromAuth(
        mockUserAuth as never,
        { displayName: 'teste2' },
      );

      expect(mockFirebase.setDoc).toHaveBeenCalledWith(
        mockDocRef,
        expect.objectContaining({
          displayName: 'teste2',
          email: mockUserAuth.email,
          createdAt: expect.any(Date),
        }),
      );

      expect(mockFirebase.getDoc).toHaveBeenCalledTimes(1);

      expect(consoleSpy).toHaveBeenCalledWith(
        'error creating user doc: ',
        mockError,
      );

      expect(userSnapshot).toEqual(mockUserSnapshot);
    });

    it('should set a new snapshot for no existing one and return it', async () => {
      const mockUserSnapshot = { exists: () => true, uid: '2' };

      mockFirebase.doc.mockImplementation(() => mockDocRef);
      mockFirebase.getDoc.mockResolvedValueOnce({ exists: () => false });
      mockFirebase.getDoc.mockResolvedValueOnce(mockUserSnapshot);
      mockFirebase.setDoc.mockResolvedValue(undefined);

      const userSnapshot = await createUserDocumentFromAuth(
        mockUserAuth as never,
      );

      expect(mockFirebase.getDoc).toHaveBeenCalledTimes(2);
      expect(userSnapshot).toEqual(mockUserSnapshot);
    });
  });

  describe('addCollectionAndDocuments', () => {
    it('should add all objects to the batch using lowercase title as id and commit', async () => {
      const mockCollectionRef = 'mock-collection-ref';

      const mockWriteBatch = {
        set: vi.fn(),
        commit: vi.fn().mockResolvedValue(undefined),
      };

      const mockObjects = [
        { title: 'Teste1', items: [] },
        { title: 'Teste2', items: [] },
        { title: 'Teste3', items: [] },
      ];

      mockFirebase.collection.mockReturnValue(mockCollectionRef);
      mockFirebase.writeBatch.mockReturnValue(mockWriteBatch);

      mockFirebase.doc.mockImplementation(
        (_collectionRef, title) => `mock-doc-ref-${title}`,
      );

      expect(
        await addCollectionAndDocuments('categories', mockObjects),
      ).toBeUndefined();

      expect(mockFirebase.collection).toHaveBeenCalledWith(db, 'categories');
      expect(mockFirebase.writeBatch).toHaveBeenCalledWith(db);

      mockObjects.forEach((object) => {
        expect(mockFirebase.doc).toHaveBeenCalledWith(
          mockCollectionRef,
          object.title.toLowerCase(),
        );
      });

      expect(mockWriteBatch.set).toHaveBeenCalledTimes(mockObjects.length);
      expect(mockWriteBatch.commit).toHaveBeenCalled();
    });
  });

  describe('getCategoriesAndDocuments', () => {
    it('should return all documents from categories collection', async () => {
      const mockCategories = [
        {
          title: 'Category A',
          items: [
            { id: 1, imageUrl: 'URL A', name: 'Item A', price: 10 },
            { id: 2, imageUrl: 'URL B', name: 'Item B', price: 20 },
          ],
        },
        {
          title: 'Category B',
          items: [{ id: 3, imageUrl: 'URL C', name: 'Item C', price: 30 }],
        },
        {
          title: 'Category C',
          items: [
            { id: 4, imageUrl: 'URL D', name: 'Item D', price: 40 },
            { id: 5, imageUrl: 'URL E', name: 'Item E', price: 50 },
            { id: 6, imageUrl: 'URL F', name: 'Item F', price: 60 },
          ],
        },
      ];

      mockFirebase.collection.mockReturnValue('mock-collection-categories-ref');
      mockFirebase.query.mockReturnValue('query');

      mockFirebase.getDocs.mockResolvedValue({
        docs: mockCategories.map((category) => ({ data: () => category })),
      });

      const categories = await getCategoriesAndDocuments();

      expect(mockFirebase.collection).toHaveBeenCalledWith(db, 'categories');
      expect(categories).toEqual(mockCategories);
    });
  });
});
