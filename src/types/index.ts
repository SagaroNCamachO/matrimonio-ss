export interface WeddingInfo {
  couple: {
    name1: string;
    name2: string;
  };
  date: string;
  time: string;
  hero: {
    headline: string;
    subheadline: string;
    image?: string;
  };
  ceremony: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    date?: string;
    time?: string;
  };
  reception: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    date?: string;
    time?: string;
  };
  dressCode: string;
  giftAccount: {
    bank: string;
    accountNumber: string;
    accountHolder: string;
    accountType: 'cuenta_rut' | 'cuenta_corriente' | 'cuenta_vista' | 'chequera_electronica' | 'cuenta_ahorro';
    accountRut?: string;
    totalReceived: number;
    goal: number;
    currency: string;
  };
  whatsappMessage: string;
  additionalInfo?: {
    contact?: {
      phone?: string;
      email?: string;
    };
    transport?: {
      description?: string;
      details?: string[];
    };
    accommodation?: {
      description?: string;
      details?: string[];
    };
    music?: {
      description?: string;
      details?: string[];
    };
  };
  photoGallery?: {
    images?: Array<{
      src: string;
      alt: string;
    }>;
  };
}

export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  confirmed: boolean;
  tableId?: string;
  notes?: string;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  guestIds: string[];
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

export interface Budget {
  total: number;
  spent: number;
  remaining: number;
}

export interface WeddingData {
  weddingInfo: WeddingInfo;
  guests: Guest[];
  tables: Table[];
  expenses: Expense[];
}

