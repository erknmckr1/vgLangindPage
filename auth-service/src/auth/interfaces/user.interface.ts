export interface RemoteUser {
  id: string;
  email: string;
  password: string;
  refreshToken?: string;
  isOnboardingCompleted: boolean;
}
