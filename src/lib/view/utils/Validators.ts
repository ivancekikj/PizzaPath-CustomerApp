export interface Validator {
    message: string;
    regex: RegExp;
}

export const Validators: Map<string, Validator> = new Map<string, Validator>(
    [
        ["email", {message: "Invalid email!", regex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/}],
        ["username", {message: "Invalid email", regex: /^(?=[a-zA-Z])[a-zA-Z0-9._-]{4,20}$/}],
        ["phoneNumber", {message: "Phone number must be in format: xxx/xxx-xxx!", regex: /^\d{3}\/\d{3}-\d{3}$/}],
    ]
);