export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  address: string;
  state?: string;
  lga?: string;
}

export interface userRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  address: string;
  state?: string;
  lga?: string;
}
