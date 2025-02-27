export interface User {
  id?: string;
  email?: string;
  role?: string;
  password?: string;
  name?: string;
  errors?: string[];
}

export interface UserModule {
  id: string;
  name: string;
  isAvailable: boolean;
  displayName?: string;
}

export interface Card {
  id: string;
  name: string;
  displayName?: string;
}

export interface EmailSendingResult {
  sent: string;
  failed: string[];
}

export interface ApiCallResponse {
  status: string;
  message: string;
}

export interface SessionResponse extends ApiCallResponse {
  cardId: number;
  constellationType: number;
  type: string;
  clientId: number;
  helperId: number;
  id: number;
  date: string;
}

export interface PhotoUploadResponse {
  message: string;
  fileName: string;
}

export interface Constellation {
  id: number;
  name: string;
  isPersonal: boolean;
  isPersonalGroup: boolean;
  isGroup: boolean;
  needsCard: boolean;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  helperId: number;
}

export interface Session {
  cardId: number;
  constellationType: number;
  type: 'personal' | 'personalGroup' | 'group';
  client: string;
  clientEmail: string;
  clientId?: number;
  id?: number;
  helperId?: number;
}

export interface GeneKeysData {
  id: number;
  [key: string]: number;
}

export interface onChart {
  [key: string]: number;
}
