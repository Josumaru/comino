// Define the structure of UserParams, which will be used as input to sign up or sign in
interface UserParams {
  username?: string;
  email: string;
  password: string;
}

// Define the structure of the user object returned by signUpWithPassword
interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
}

// Define the response type for signUpWithPassword, which can either return a User or an error
type AuthResponse = 
  | User // Successful response returns a User
  | { error: any }; // Error response returns an error object
