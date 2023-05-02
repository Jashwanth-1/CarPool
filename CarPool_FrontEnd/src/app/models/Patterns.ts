export enum Patterns {
  locations = '[a-zA-Z ]*',
  password = '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}',
  numbers = '^[0-9]*$',
}
