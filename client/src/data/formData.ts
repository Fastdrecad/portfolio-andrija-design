// Input fields configuration for form
export const inputs = [
  {
    id: 1,
    name: "firstName",
    type: "text",
    placeholder: "John *",
    errorMessage: "Please enter a valid first name",
    label: "What's your first name?",
    pattern: "^[A-Za-z]{3,15}$",
    required: true
  },
  {
    id: 2,
    name: "lastName",
    type: "text",
    placeholder: "Doe *",
    errorMessage: "Please enter a valid last name",
    label: "What's your last name?",
    pattern: "^[A-Za-z]{3,15}$",
    required: true
  },
  {
    id: 3,
    name: "email",
    type: "email",
    placeholder: "john@doe.com *",
    errorMessage: "Please enter a valid email address",
    label: "What's your email?",
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    required: true
  },
  {
    id: 4,
    name: "organization",
    type: "text",
    placeholder: "John & Doe ®",
    errorMessage: "Please tell us your organization",
    label: "What's the name of your organization?",
    // pattern: "^[A-Za-z]{3,15}$",
    required: false
  },
  {
    id: 5,
    name: "services",
    type: "text",
    placeholder: "Cabinetry, Product Design, CAD, Rendering...",
    errorMessage: "Please specify the services you're looking for.",
    label: "What services are you looking for?",
    // pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    required: false
  },
  {
    id: 6,
    name: "message",
    type: "textarea",
    placeholder: "Hello Andrija, can you help me with...",
    errorMessage: "Please enter a text between 3 and 3000 characters",
    label: "Your message",
    minLength: 10,
    maxLength: 3000,
    required: true
  }
];
