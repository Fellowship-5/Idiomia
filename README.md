# Idiomia Web Application

### Desktop View

<img src="https://imgur.com/DZXU9j8.jpg" title="Idiomia App Desktop"/>

### Mobile Views

<img src="https://imgur.com/Ad72rTy.jpg" title="Idiomia App Mobile"/>

The SPA with 7 pages (routes):

- A Homepage for users to see approved proverbs and add proverb anonymously,
- Register page for users to register to be able to manage their posted proverbs,
- Login page for users to authenticated in the app to access private pages,
- A User Dashboard page which shows authenticated/registered user proverbs and actions
- An Admin Dashboard page for app admins which shows all proverbs and actions
- About Page
- Not found page

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Demo

Online Deployment of this project is available at [Idiomia App](https://idiomia2020.web.app/).

You can use below credentials to test pagination and search functions of the app. The database is populated by [fakerjs](https://github.com/marak/Faker.js/) and [loremarabic](https://github.com/amjarino/loremarabic) library.

```
email: ss@gmail.com
password: 123456
```

### Getting Started

To get started you can simply clone the repo and install the dependencies in the root folder. In the root and client

| Steps   | with [NPM](https://www.npmjs.com/) |
| ------- | ---------------------------------- |
| Install | `npm install`                      |
| Run Client| `npm start`  (in the /client)      |
| Run Server| `node app`   (in the root folder)  |

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Directory Layout and Tree

##### CLIENT-SIDE

```
.

├── public
│
├── README.md
├── src
│   ├── App.css
│   ├── App.js
│   ├── components              * reusable react components
│   │   ├── Badge.js
│   │   ├── Breadcrumb.css
│   │   ├── Breadcrumb.js
│   │   ├── Button.css
│   │   ├── Button.js
│   │   ├── Checkbox.css
│   │   ├── Checkbox.js
│   │   ├── FlexTableCell.js
│   │   ├── FlexTable.css
│   │   ├── FlexTableHeader.js
│   │   ├── FlexTableIconCell.js
│   │   ├── FlexTable.js
│   │   ├── Icon.js
│   │   ├── Input.js
│   │   ├── Modal.js
│   │   ├── Navbar.css
│   │   ├── NavbarDropdown.js
│   │   ├── Navbar.js
│   │   ├── NavbarLink.js
│   │   ├── Pagination.css
│   │   ├── Pagination.js
│   │   ├── ProgressBar.css
│   │   ├── ProgressBar.js
│   │   ├── Section.css
│   │   ├── Section.js
│   │   ├── sign up and log in
│   │   │   └── SocialLogin.js
│   │   ├── Spinner.js
│   │   ├── Tabs.css
│   │   ├── Tabs.js
│   │   ├── ToggleSwitch.css
│   │   └── ToggleSwitch.js
│   ├── helpers
│   │   ├── flexTableData.js
│   │   ├── formData.js
│   │   ├── functions.js
│   │   └── setAuthToken.js
│   ├── images
│   ├── index.css
│   ├── index.js
│   ├── pages
│   │   ├── about
│   │   │   ├── About.css
│   │   │   └── About.js
│   │   ├── admin
│   │   │   ├── AdminDashboard.css
│   │   │   └── AdminDashboard.js
│   │   ├── auth
│   │   │   ├── Login.css
│   │   │   ├── Login.js
│   │   │   ├── Register.css
│   │   │   └── Register.js
│   │   ├── home
│   │   │   ├── HomePage.css
│   │   │   ├── HomePage.js
│   │   │   ├── Search.css
│   │   │   └── Search.js
│   │   ├── layout
│   │   │   └── Navbar.js
│   │   ├── proverb
│   │   │   ├── AddProverb.js
│   │   │   ├── Proverb.css
│   │   │   ├── Proverb.js
│   │   │   ├── ProverbList.js
│   │   │   └── UpdateProverb.js
│   │   ├── routing
│   │   │   └── PrivateRoute.js
│   │   └── user
│   │       ├── Dashboard.css
│   │       └── Dashboard.js
│   │
│   └── redux                       * Global state management
│       ├── actions
│       │   ├── auth.js
│       │   ├── location.js
│       │   ├── pagination.js
│       │   ├── proverb.js
│       │   ├── search.js
│       │   ├── toggle.js
│       │   └── types.js
│       ├── hooks.js                * Custom redux hooks
│       ├── reducers
│       │   ├── auth.js
│       │   ├── index.js
│       │   ├── pagination.js
│       │   ├── proverb.js
│       │   ├── search.js
│       │   └── toggle.js
│       ├── selectors
│       │   ├── authSelectors.js
│       │   ├── index.js
│       │   ├── paginationSelectors.js
│       │   ├── proverbSelectors.js
│       │   ├── searchSelectors.js
│       │   └── toggleSelectors.js
│       └── store.js


```

##### SERVER-SIDE

```
.
├── admin-routes
│   ├── admin-controllers.js
│   ├── admin-routes.js
│   └── checkAdmin.js
│
├── app.js
│
├── controllers
│   ├── proverbs-controllers.js
│   └── users-controllers.js
│
├── db
│   └── mongodb.js
├── middleware
│   └── checkAuth.js
├── models
│   ├── proverb.js
│   └── user.js
│
├── routes
│   ├── proverbs-routes.js
│   └── users-routes.js
│
├── services
│   ├── paginateResponse.js
│   └── user_methods.js



```

### Application

#### ES6 + Features

- Arrow Functions
- Template Literals
- Destructuring Assignment
- Block-Scoped Variables Let and Const
- async await with try/catch
- Spread operator
- Modules export/import
- New Built-In Methods
- Default Parameters

#### Libraries/Frameworks

- react: UI library
- react-router-dom: The router components of react
- redux react-redux: Global State Management framework
- redux-thunk: Middleware for redux to make async calls
- react-bootstrap: React integration for bootstrap css framework
- react-toastify: A library for react to have app level notification
- axios: to make HTTP requests
- nodejs: JS runtime for backend
- express: server/web framework for nodejs to create server
- express-validator: validator library for express framework
- mongoose: mongodb database library for nodejs
- bcryptjs: hashing library which is used to hash passwords in this project
- jsonwebtoken: JWT implementation library

#### Flow

##### Main Component Hierarchy

```
  App
│ │
│ ├── Navbar
│ │
│ ├── ToastContainer
│ │
│ ├── Homepage
│ │ ├── ProverbList
│ │ ├── Search
│ │ ├── Section
│ │ ├── Breadcrump
│ │ └── Pagination
│ │
│ ├── Register
│ │ ├── Breadcrump
│ │ └── Section
│ │
│ ├── Login
│ │ ├── Breadcrump
│ │ └── Section
│ │
│ ├──User Dashboard
│ │ ├── Pagination
│ │ ├── Search
│ │ ├── Section
│ │ ├── Breadcrump
│ │ ├── Modal
│ │ ├── UpdateProverb
│ │ ├── AddProverb
│ │ ├── DeleteProverb
│ │ ├── Modal
│ │ └── FlexTable
│ │
│ ├── Admin Dashboard
│ │ ├── Pagination
│ │ ├── Search
│ │ ├── Section
│ │ ├── Breadcrump
│ │ ├── Modal
│ │ ├── ToggleSwitch
│ │ ├── UpdateProverb
│ │ ├── AddProverb
│ │ ├── DeleteProverb
│ │ ├── ApproveProverb
│ │ └── FlexTable
│ │
│ ├── ProverbList
│ │ ├── Pagination
│ │ ├── UpdateProverb
│ │ ├── AddProverb
│ │ ├── DeleteProverb
│ │ └── Proverb


```

##### Global State Flow

- auth: stores authentication states
- proverb: stores proverb states
- search: stores search states
- pagination: stores pagination states and items
- toggle: stores toggle switch states

```
{
  auth: {
    token: null,
    isAuthenticated: false,
    loading: false,
    user: null
  },
  proverb: {
    approvedProverbs: [],
    userProverbs: [],
    allProverbs: [],
    proverb: {},
    totalPages: null,
    loading: false,
    error: {}
  },
  search: {
    isActive: null,
    searchTerm: '',
    field: 'proverb'
  },
  pagination: {
    activePage: 1,
    pageSize: 5,
    pageItems: [],
    pageReset: false
  },
  toggle: {
    value: 0,
    label: 'All'
  }
}

```

#### Api Calls

The API documentation is here [Idiomia APIs](https://documenter.getpostman.com/view/10490287/TVYNWu3w#360ec7d4-2b33-4c6a-9f08-c458288fa196).


### Authors

- [Ammar](https://github.com/AlsasaAmmar)
- [Salih](https://github.com/salih18)

###  Code Reviewers
#####  Thank you for your invaluable mentoring :)

- [Sarah](https://github.com/sarah-vanderlaan)
- [Frank](https://github.com/frankPairs)
```
