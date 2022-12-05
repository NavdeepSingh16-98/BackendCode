# Register and login API

## Navdeep Singh


### Teck Stack Used -

- Node Js
- Express Js
- MongoDB Atlas

### This Project contains following three API's-

- Regiter API
    - Url 
    > /register
    - Using this API we can register a user
    - JSON Format
    ```Javascript
    {
           "firstname":"string",
           "lastname":"string",
           "email":"string",
           "password":"string"
    }
    ```
    
- Login API
    - Url 
    > /login
    - Using this API, already existing user can login into the application
    - JSON Format
    ```Javascript
    {
           "email":"string",
           "password":"string"
    }
    ```


- Viewing Dashboard API
    - Url 
    > /dashboard
    - Using this API, already logged in user can view the dashboard
    - Kindly send the cookie(received from login api) in header to use this
