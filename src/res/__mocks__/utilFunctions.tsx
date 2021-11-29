export const getCurrentUser = jest.fn().mockImplementation(() => {
  return new Promise((resolve) => {
    resolve({
      attributes: {
        name: 'Mock Current User',
        phone_number: '+1234567890',
        phone_number_verified: true,
        sub: '1',
      },
      id: '1',
      username: '1',
    });
  });
});
