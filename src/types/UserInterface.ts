export interface ResponseLoginInterface {
  status: boolean;
  access_token: string;
  token_type: string;
  expires_in: number;
}