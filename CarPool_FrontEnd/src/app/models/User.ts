export class User {
  userId: number = 0;
  emailId: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  mobileNumber: string = '';

  splitName(fullName: string) {
    this.firstName = fullName.split(' ')[0];
    if (fullName.split(' ').length > 1) {
      this.lastName = fullName.split(' ')[1];
    }
  }
}
