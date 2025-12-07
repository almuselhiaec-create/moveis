// File: src/**tests**/Login.test.js

import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../Components/Login';
import reducer from '../Features/UserSlice';
import '@testing-library/jest-dom';

// 1. Initialize Mock Store
const mockStore = configureStore([]);
const store = mockStore({
user: { user: null, loading: false, error: null, purchase: null },
});

// 2. Snapshot Test
test('matches the UI snapshot with screen.debug()', () => {
const { container } = render( <Provider store={store}> <Router> <Login /> </Router> </Provider>
);

screen.debug(container); // Logs the current DOM for debugging
expect(container).toMatchSnapshot();
});

// 3. Validate Email Format
test('validates email format using regex', () => {
render( <Provider store={store}> <Router> <Login /> </Router> </Provider>
);

const emailInput = screen.getByLabelText(/email/i);
fireEvent.change(emailInput, { target: { value: '[valid.email@example.com](mailto:valid.email@example.com)' } });

const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
expect(emailRegex.test(emailInput.value)).toBe(true);

fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
expect(emailRegex.test(emailInput.value)).toBe(false);
});

// 4. Validate Password Format
test('validates password format using regex', () => {
render( <Provider store={store}> <Router> <Login /> </Router> </Provider>
);

const passwordInput = screen.getByLabelText(/password/i);
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

fireEvent.change(passwordInput, { target: { value: 'Abc@123' } });
expect(passwordRegex.test(passwordInput.value)).toBe(true);

fireEvent.change(passwordInput, { target: { value: 'abc123' } });
expect(passwordRegex.test(passwordInput.value)).toBe(false);
});

// 5. Testing the initial state of the store
const initVal = {
user: null,
loading: false,
error: null,
purchase: null,
};

test('should return initial state', () => {
expect(reducer(undefined, { type: undefined })).toEqual(initVal);
});
