import { ChangeEvent, FormEvent, useState } from "react";
import * as yup from 'yup';

// Define the expected format of the form data.
interface FormDataFormat {
    firstName: string;
    middleName: string;
    lastName: string;
    age: number;
    email: string;
}

// Define the validation schema for form data using yup.
const schema: yup.ObjectSchema<FormDataFormat> = yup.object({
    firstName: yup.string().min(3, 'First Name must be more than 2 letters').required('First Name cannot be empty'),
    middleName: yup.string().defined().default('').nullable(),
    lastName: yup.string().defined().min(3, 'Last Name must be more than 2 letters').required('Last Name cannot be empty'),
    age: yup.number().defined().min(3, 'Age must be at least 3').max(150, 'Age must be at most 150').required('Please enter your Age'),
    email: yup.string().email('Enter a valid email').required('Email cannot be empty'),
});

// React component for the form.
function Form() {
    // State to manage form data.
    const [data, setData] = useState<FormDataFormat>({
        firstName: '',
        middleName: '',
        lastName: '',
        age: 0,
        email: '',
    });

    // State to manage validation errors.
    const [error, setError] = useState<{ [key: string]: string }>({});

    // State to manage the final submission message.
    const [finalMessage, setFinalMessage] = useState<string>('');

    // Event handler for input changes.
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFinalMessage('');
        // Update the corresponding property in the 'data' state.
        setData({
            ...data,
            [e.target.name]: e.target.value || '',
        });
    };

    // Event handler for form submission.
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Reset validation errors.
        setError({});

        try {
            // Validate form data using the defined schema.
            await schema.validate(data, { abortEarly: false });

            // Send a POST request with the validated data to the server.
            const response = await fetch('http://127.0.0.1:5000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Handle the server response.
            if (response.ok) {
                console.log('Data received and saved successfully!');
                setFinalMessage('Data received and saved successfully!');
            } else {
                setFinalMessage(`Error submitting form: ${response.statusText}`);
            }
        } catch (error: any) {
            // Handle validation errors or other submission errors.
            if (error instanceof yup.ValidationError) {
                // Extract validation errors and update the 'error' state.
                const newErrors: { [key: string]: string } = {};
                error.inner.forEach((validationError) => {
                    newErrors[validationError.path || ''] = validationError.message;
                });
                setError(newErrors);
                console.log(newErrors);
            } else {
                console.error('Error submitting form:', error);
                setFinalMessage(`Error submitting form: ${error}`);
            }
        }
    };

    // Render the form component.
    return (
        <>
            {/* Form element with submission handling */}
            <form onSubmit={handleSubmit}>
                {/* List of form input fields */}
                <ul style={{ margin: '20px', listStyle: 'none' }}>
                    {/* Input field for first name */}
                    <li style={{ margin: '20px', paddingTop: '10px' }}>
                        <input
                            name="firstName"
                            type="text"
                            onChange={handleChange}
                            value={data.firstName}
                            style={{ padding: '5px' }}
                            placeholder="Full Name"
                            autoComplete="off"
                            id="fNameField"
                        />
                        <br />
                        {/* Display validation error for first name */}
                        {error.firstName && <div style={{ color: 'red' }}>{error.firstName}</div>}
                    </li>
                    {/* Input field for middle name */}
                    <li style={{ margin: '20px', paddingTop: '10px' }}>
                        <input
                            name="middleName"
                            type="text"
                            onChange={handleChange}
                            value={data.middleName}
                            style={{ padding: '5px' }}
                            placeholder="Middle Name"
                            autoComplete="off"
                            id="mNameField"
                        />
                        <br />
                        {/* Display validation error for middle name */}
                        {error.middleName && <div style={{ color: 'red' }}>{error.middleName}</div>}
                    </li>
                    {/* Input field for last name */}
                    <li style={{ margin: '20px', paddingTop: '10px' }}>
                        <input
                            name="lastName"
                            type="text"
                            onChange={handleChange}
                            value={data.lastName}
                            style={{ padding: '5px' }}
                            placeholder="Last Name"
                            autoComplete="off"
                            id="lNameField"
                        />
                        <br />
                        {/* Display validation error for last name */}
                        {error.lastName && <div style={{ color: 'red' }}>{error.lastName}</div>}
                    </li>
                    {/* Input field for email */}
                    <li style={{ margin: '20px', paddingTop: '10px' }}>
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={data.email}
                            style={{ padding: '5px' }}
                            placeholder="Email"
                            autoComplete="off"
                            id="emailField"
                        />
                        <br />
                        {/* Display validation error for email */}
                        {error.email && <div style={{ color: 'red' }}>{error.email}</div>}
                    </li>
                    {/* Input field for age */}
                    <li style={{ margin: '20px', paddingTop: '10px' }}>
                        <input
                            name="age"
                            type="number"
                            onChange={handleChange}
                            value={data.age || ''}
                            style={{ padding: '5px' }}
                            placeholder="Age"
                            autoComplete="off"
                            id="ageField"
                        />
                        <br />
                        {/* Display validation error for age */}
                        {error.age && <div style={{ color: 'red' }}>{error.age}</div>}
                    </li>
                    {/* Submission button */}
                    <button type="submit">Submit</button>
                    {/* Display the final submission message */}
                    <li style={{ margin: '20px', paddingTop: '10px' }}>
                        {finalMessage && (
                            <div style={{ color: finalMessage.includes('Error') ? 'red' : 'green' }}>
                                {finalMessage}
                            </div>
                        )}
                    </li>
                </ul>
            </form>
        </>
    );
}

export default Form;
