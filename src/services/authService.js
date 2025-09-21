// tokenization-frontend/src/services/authService.js

export const authService = {
  async login(email, password) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock-token',
          user: { id: 1, email, name: 'Test User' }
        });
      }, 1000);
    });
  },

  async register(userData) {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock-token',
          user: { id: 1, ...userData }
        });
      }, 1000);
    });
  },

  async validateToken(token) {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, email: 'test@example.com', name: 'Test User' });
      }, 500);
    });
  }
};
