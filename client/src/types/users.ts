export const USER_FIELDS = [
  "firstName",
  "lastName",
  "maidenName",
  "age",
  "gender",
  "email",
  "username",
  "bloodGroup",
  "eyeColor",
] as const;

export type UserField = (typeof USER_FIELDS)[number];

export interface User {
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  username: string;
  bloodGroup: string;
  eyeColor: string;
}

export const TABLE_COLUMNS = USER_FIELDS.map((field) => ({
  key: field,
  label: field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase()),
}));

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
