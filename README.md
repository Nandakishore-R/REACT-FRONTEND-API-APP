# Vendor Module React POC

## Table of Contents

1. [Project Overview](#project-overview)
2. [Objectives](#objectives)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Installation and Setup](#installation-and-setup)
6. [Usage](#usage)
7. [Current Enhancements](#current-enhancements)
   1. [Directory Structure Updates](#directory-structure-updates)
   2. [Imports Modernization](#imports-modernization)
   3. [State Management and Effects](#state-management-and-effects)
   4. [Functional Component Exports](#functional-component-exports)
   5. [Navigation Updates](#navigation-updates)
   6. [Redux Updates](#redux-updates)
8. [Future Enhancements](#future-enhancements)
9. [Contribution Guidelines](#contribution-guidelines)
10. [Acknowledgments](#acknowledgments)

## Project Overview

This Proof of Concept (POC) involves modernizing a legacy ASP.NET Core MVC application with React components embedded in `.cshtml` files. Due to the discontinuation of React components rendering within `.cshtml`, the objective is to refactor and recreate the **Vendor Module** as a standalone React application, adhering to modern React.js development practices.

## Objectives

1. Decouple the legacy application’s frontend by implementing a new React.js application.
2. Recreate the functionality of the existing "Vendor Module" using the provided `.cshtml` and `.jsx` files as references.
3. Demonstrate the functionality with static data as part of the POC.
4. Prepare the application to integrate with the upcoming ASP.NET Core Web API once provided.

## Features

- **Standalone React Frontend:** Modular and component-based architecture.
- **Static Data Integration:** Mimics the original module’s functionality using placeholder data.
- **Modern React Practices:** Functional components, hooks (e.g., `useState`, `useEffect`), and component-based styling.
- **Responsive Design:** Ensures usability across various device sizes.

## Tech Stack

- **Frontend Framework:** React.js
- **Styling:** CSS Modules/AntDesigns
- **State Management:** React-Redux Redux ToolKit
- **Build Tool:** Vite

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sreekesh-k/Api-Frontend-React.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Api-Frontend-React
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

- Navigate to `http://localhost:5173` to view the application.
- The **Vendor Module** showcases the recreated functionality based on the provided `.cshtml` and `.jsx` files.
- Data is currently static and hardcoded for demonstration purposes.

## Current Enhancements

### Directory Structure Updates

We have adopted a modular directory structure to ensure better scalability and maintainability. The new structure is as follows:

```
├───public
│   └───assets
└───src
    ├───components
    │   ├───vendors          # Components specific to the Vendor Module
    │   └───vendorsEntry     # Entry point for Vendor Module
    ├───layouts
    │   └───form             # Reusable form layouts
    ├───pages                # Page-level components
    └───store                # State management setup
```

### Imports Modernization

To improve modularity and code readability, imports have been updated:

**Old Imports:**

```jsx
const Table = window["antd"].Table;
const Pagination = window["antd"].Pagination;
const Tooltip = window["antd"].Tooltip;
const Tag = window["antd"].Tag;
```

**New Imports:**

```jsx
import { Table } from "antd";
import { Pagination } from "antd";
import { Tooltip } from "antd";
import { Tag } from "antd";
```

This approach ensures that we are using ES module imports directly, making the codebase compatible with modern React practices.

### State Management and Effects

We transitioned from using `React.useState` and `React.useEffect` to direct imports of `useState` and `useEffect` for a cleaner syntax.

**Old State Management and `useEffect`:**

```jsx
const [loading, setLoading] = React.useState(true);
React.useEffect(() => {
  localStorage.setItem("isViewMode", JSON.stringify(true));
  sessionStorage.removeItem("vendorDetails");
}, []);
```

**New State Management and `useEffect`:**

```jsx
import { useState, useEffect } from "react";
const [loading, setLoading] = useState(true);

useEffect(() => {
  localStorage.setItem("isViewMode", JSON.stringify(true));
  sessionStorage.removeItem("vendorDetails");
}, []);
```

This change improves readability and aligns with modern React coding standards.

### Functional Component Exports

To streamline reusability and simplify module integration, all components now use default exports.

**Example:**

```jsx
const VendorComponent = () => {
  return <div>Vendor Module</div>;
};

export default VendorComponent;
```

This ensures that each component can be easily imported elsewhere in the project.

### Navigation Updates

Navigation logic was updated to leverage `react-router-dom`, replacing the traditional `window.location` approach.

**Old Navigation:**

```javascript
window.location = `/Vendor/VendorDetails?id=${record.Id}`;
```

**New Navigation (React Router DOM):**

```javascript
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate(`/vendor/vendorDetails?id=${record.Id}`);
```

Using `react-router-dom` provides better control over routing and navigation, adhering to SPA principles.

### Redux Updates

State management has been modernized by migrating from traditional Redux to Redux Toolkit. This significantly reduces boilerplate code and enhances maintainability.

**Old Redux (Store and Usage):**

```javascript
// store.js
import { createStore } from "redux";

const initialState = { vendors: [] };

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VENDORS":
      return { ...state, vendors: action.payload };
    default:
      return state;
  }
};

const store = createStore(vendorReducer);
export default store;

// Component usage
import { useDispatch } from "react-redux";

const dispatch = useDispatch();
dispatch({ type: "SET_VENDORS", payload: vendors });
```

**New Redux (Toolkit):**

```javascript
// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
  name: "vendors",
  initialState: { vendors: [] },
  reducers: {
    setVendors: (state, action) => {
      state.vendors = action.payload;
    },
  },
});

export const { setVendors } = vendorSlice.actions;
const store = configureStore({ reducer: { vendors: vendorSlice.reducer } });
export default store;

// Component usage
import { useDispatch } from "react-redux";
import { setVendors } from "./store";

const dispatch = useDispatch();
dispatch(setVendors(vendors));
```

This approach simplifies state management and encourages scalability.

### Implimented The CreateSelector to handle Memorization which avoids multiple renders

```ts
import { createSelector } from "@reduxjs/toolkit";

const selector = createSelector(
  inputSelectors, // One or more input selectors
  resultFunction // A function to compute the result based on input
);
```

- `inputSelectors`: One or more selectors that extract values from the Redux state.
- `resultFunction`: A function that takes the outputs of the input selectors and computes a derived result.

## Example

### State Example

Consider the following state structure for a user profile application:

```ts
const initialState = {
  users: [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
  ],
  filter: { minAge: 28 },
};
```

### Basic Selector

```ts
// A simple selector to get all users
const selectUsers = (state) => state.users;

// A selector to get the filter criteria
const selectFilter = (state) => state.filter;
```

### Memoized Selector with `createSelector`

Using `createSelector`, we can create a memoized selector that filters users based on the age:

```ts
import { createSelector } from "@reduxjs/toolkit";

// A selector that filters users based on the minimum age from the filter
const selectFilteredUsers = createSelector(
  [selectUsers, selectFilter], // Input selectors
  (users, filter) => {
    return users.filter((user) => user.age >= filter.minAge);
  } // Result function
);
```

### Usage

To use the selector in your component, use `useSelector` from `react-redux`:

```tsx
import React from "react";
import { useSelector } from "react-redux";

const UserList = () => {
  const filteredUsers = useSelector(selectFilteredUsers);

  return (
    <div>
      <h2>Filtered Users</h2>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
```

### Benefits of `createSelector`

- **Memoization**: Prevents unnecessary recalculations of the derived data when the inputs haven't changed.
- **Performance Optimization**: Reduces recomputations by tracking the state of inputs.
- **Readable Code**: Cleanly separates the logic of computing derived state from the rest of your components or reducers.

## Future Enhancements

- **API Integration:** Replace static data with API calls once the ASP.NET Core Web API is provided.
- **Error Handling:** Implement error boundaries and API request error handling.

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your fork and create a pull request.

### Acknowledgments

We thank the team for providing legacy `.cshtml` and `.jsx` files as references, which served as a foundation for this POC.