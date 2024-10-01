// Input fields configuration for form
export const inputs = [
  {
    id: 1,
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    errorMessage:
      "First Name should be between 3-15 characters and shouldn't include any special character.",
    label: "First Name",
    pattern: "^[A-Za-z0-9]{3,15}$",
    required: true
  },
  {
    id: 2,
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    errorMessage:
      "Last Name should be between 3-15 characters and shouldn't include any special character.",
    label: "Last Name",
    pattern: "^[A-Za-z0-9]{3,15}$",
    required: true
  },
  {
    id: 3,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "Please input a valid email.",
    label: "Email",
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    required: true
  },
  {
    id: 4,
    name: "message",
    type: "textarea",
    placeholder: "Message",
    errorMessage: "Message must be between 10 and 300 characters.",
    label: "Message",
    minLength: 10,
    maxLength: 300,
    required: true
  }
];
