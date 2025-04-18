const accordionData = {
    accordions: [
        {
            title: 'Personal Information',
            id: 'personalInfo',
            fields: [
                { label: 'First Name', type: 'text', key: 'firstName' },
                { label: 'Last Name', type: 'text', key: 'lastName' },
                { label: 'Date of Birth', type: 'date', key: 'dob' },
            ],
        },
        {
            title: 'Contact Details',
            id: 'contactDetails',
            fields: [
                { label: 'Email', type: 'email', key: 'email' },
                { label: 'Phone Number', type: 'tel', key: 'phone' },
                { label: 'Address', type: 'textarea', key: 'address' },
            ],
        },
        {
            title: 'Account Settings',
            id: 'accountSettings',
            fields: [
                { label: 'Username', type: 'text', key: 'username' },
                { label: 'Password', type: 'password', key: 'password' },
                { label: 'Confirm Password', type: 'password', key: 'confirmPassword' },
            ],
        },
    ],
};

export default accordionData