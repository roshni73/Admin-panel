import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikHelpers
} from 'formik';

import Container from '#components/Container';
import { UserInterface } from '#interfaces/UserInterface';
import { addLocalUser, getLocalUserById, editLocalUser } from '#utils/LocalUser';

import './index.css';

const validationSchema = Yup.object<UserInterface>({
  id: Yup.number(),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  maidenName: Yup.string().required('Maiden name is required'),
  age: Yup.number().required('Age is required').positive('Age must be positive'),
  gender: Yup.string().required("Gender is required."),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  phone: Yup.string().required('Phone number is required')
    .matches(/^(\+\d{1,3}[- ]?)?(\d{3}[- ]?\d{3}[- ]?\d{4})$/, 'Phone number is not valid'),
});
const AddUsers = () => {
  const { id } = useParams<{ id?: string }>();
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    const getUserDetails = async () => {
      if (Number(id) > 100 || getLocalUserById(Number(id))) {
        const userData: UserInterface | null = getLocalUserById(Number(id));
        if (!userData) {
          setErrorMessage('User not found.');
          setIsLoading(false);
          return;
        }
        setCurrentUser(userData);
        setIsLoading(false);
      } else {
        const url = `https://dummyjson.com/users/${id}`;
        const params = {
          select: "firstName,lastName,maidenName,age,gender,email,phone",
        };

        try {
          const res = await axios.get(url, { params });
          setCurrentUser(res.data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setErrorMessage(err.message);
          } else {
            setErrorMessage("An unknown error occurred.");
          }
        } finally {
          setIsLoading(false);
        }
      }

    };

    getUserDetails();
  }, [Number(id)]);

  const handleSubmit = async (values: UserInterface, { setSubmitting, resetForm }: FormikHelpers<UserInterface>) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      let response;
      if (values.id) {
        if (values.id > 100 || getLocalUserById(values.id)) {
          editLocalUser(values);
          setCurrentUser(values);
          setSuccessMessage('User updated successfully.');
          resetForm();
          return;
        } else {
          response = await axios.put(`https://dummyjson.com/users/${values.id}`, values);
        }
      } else {
        response = await axios.post('https://dummyjson.com/users/add', values);
      }

      if (response.data.id) {
        const newUser: UserInterface = {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          maidenName: response.data.maidenName,
          age: response.data.age,
          gender: response.data.gender,
          email: response.data.email,
          phone: response.data.phone,
        };

        addLocalUser(newUser);
        setCurrentUser(newUser);
        setSuccessMessage(values.id ? 'User updated successfully.' : 'User added successfully.');
        resetForm();
      } else {
        setErrorMessage('Failed to add user.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="user-details">
        <h1>{currentUser ? 'Edit User' : 'Add User'}</h1>
      </div>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage ? (
        <div className='error'>Error: {errorMessage}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <Formik
          initialValues={{
            id: currentUser?.id || 0,
            firstName: currentUser?.firstName || '',
            lastName: currentUser?.lastName || '',
            maidenName: currentUser?.maidenName || '',
            age: currentUser?.age || 0,
            gender: currentUser?.gender || '',
            email: currentUser?.email || '',
            phone: currentUser?.phone || '',
          }} enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="user-btn">
                <button onClick={() => window.history.back()}>X</button>
              </div>
              <ErrorMessage name="firstName" component="div" className="input-error" />
              <Field type="text" name="firstName" placeholder="First Name" />

              <ErrorMessage name="lastName" component="div" className="input-error" />
              <Field type="text" name="lastName" placeholder="Last Name" />

              <ErrorMessage name="maidenName" component="div" className="input-error" />
              <Field type="text" name="maidenName" placeholder="Maiden Name" />

              <ErrorMessage name="age" component="div" className="input-error" />
              <Field type="number" name="age" placeholder="Age" />

              <ErrorMessage name="gender" component="div" className="input-error" />
              <Field as="select" name="gender">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>

              <ErrorMessage name="email" component="div" className="input-error" />
              <Field type="email" name="email" placeholder="Email" />

              <ErrorMessage name="phone" component="div" className="input-error" />
              <Field type="tel" name="phone" placeholder="Phone Number" />
              
               <button type="submit" disabled={isSubmitting}>
                   {isSubmitting ? 'Loading...' : (currentUser ? 'Update User' : 'Add Users')}
                </button>

              
            </Form>
          )}
        </Formik>
      )
      }
    </Container >
  );
};

export default AddUsers;