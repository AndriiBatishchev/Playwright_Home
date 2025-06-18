export const errorList = {
    name: {
        required: 'Name required',
        invalid: 'Name is invalid',
        long: 'Name has to be from 2 to 20 characters long',
    },


    lastname: {
        required: 'Last name required',
        invalid: 'Last name is invalid',
        long: 'Last name has to be from 2 to 20 characters long',
    },

    email: {
        required: 'Email required',
        invalid: 'Email is incorrect',
    },
    
    password: {
        required: 'Password required',
        invalid: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    },

    re_password: {
        required: 'Re-enter password required',
        invalid: 'Passwords do not match',
    },
}
