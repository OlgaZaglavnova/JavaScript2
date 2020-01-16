class StorageService {
    storage = sessionStorage;

    getItem(key) {
        return this.storage.getItem(key);
    }

    setItem(key, value) {
        return this.storage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
    }

    removeItem(key) {
        return this.storage.removeItem(key);
    }
}

export default new StorageService();