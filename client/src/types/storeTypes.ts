export interface RootState {
  auth: {
    user: null | { email: string };
    token: string | null;
  };
  route: {
    isFormSubmitted: boolean;
  };
}
