export const getBaseUrl = () => {
  return process.env.NEXTAUTH_URL || 'http://localhost:3000'
} 