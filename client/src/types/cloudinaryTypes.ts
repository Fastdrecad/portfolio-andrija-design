export interface CloudinaryResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  folder: string;
  eager?: {
    format: string;
    url: string;
    secure_url: string;
    width?: number;
    height?: number;
    bytes?: number;
    transformation?: string;
  }[];
}
