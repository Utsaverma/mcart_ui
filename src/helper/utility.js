import { fetchAuthSession } from "aws-amplify/auth";

export const GUEST_USER = {
  "userId": "default",
  "email": "guest@mcart.com",
  "name": "Guest User",
  "isAuthenticated": false
}

export const ADDRESS_KEY_MAPPING = {
  fullName: { value: 'Full Name', required: true },
  address: { value: 'Address', required: true },
  landmark: { value: 'Landmark', required: false },
  city: { value: 'City', required: true },
  zipCode: { value: 'Zipcode', required: true },
  phoneNo: { value: 'Contact Number', required: true },
  additionalInstructions: { value: 'Additional Instructions', required: false }
}

export const PAYMENTS_KEY_MAPPING = {
  bankName: 'Bank Name',
  chequeNumber: 'Cheque Number',
  cardNumber: 'Card Number',
  expiryDate: 'Expiry Date',
  cvv: 'CVV',
  name: 'Name on Card',
  accountNumber: 'Account Number',
  confirmAccountNumber: 'Confirm Account Number',
  accountHolderName: `Account Holder's Name`,
  ifsc: 'IFSC Code',
}

export const INPUT_TYPE_MAPPING = {
  accountNumber: 'password'
}

export const fetchCurrUserAttributes = async (updateUser) => {
  try {
    const { _, idToken } = (await fetchAuthSession()).tokens ?? {};
    if (idToken && idToken.payload) {
      const currUser = {
        "userId": idToken.payload['sub'] ? idToken.payload['sub'] : idToken.payload['identities'][0]['userId'],
        "email": idToken.payload['email'],
        "name": idToken.payload['name'],
        "isAuthenticated": true,
      }
      updateUser(currUser);
    }
    else {
      updateUser(GUEST_USER);
    }
  }
  catch (err) {
    console.log(err);
    updateUser(GUEST_USER);
  }
}

export const checkEmptyValues = (obj) => {
  return Object.values(obj).some(value => value === '')
};

export const checkAllEmptyValues = (obj) => {
  return Object.values(obj).every(value => value === '');
};