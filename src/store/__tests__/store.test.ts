import { storage } from '../store';

describe('Store file', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should set and read an item on local storage', async () => {
    await storage.setItem('item1', 'teste');

    const itemValue = await storage.getItem('item1');
    expect(itemValue).toBe('teste');
  });

  it('should return null when the item key is not found', async () => {
    const itemValue = await storage.getItem('item2');
    expect(itemValue).toBeNull();
  });

  it('should remove item from local storage', async () => {
    await storage.setItem('item3', 'teste');
    await storage.removeItem('item3');

    const itemValue = await storage.getItem('item3');
    expect(itemValue).toBeNull();
  });
});
