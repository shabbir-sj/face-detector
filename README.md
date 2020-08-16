# Github Page
[Demo Link](https://shabbir-sj.github.io/face-detector/)
(due to static deployment, reload will not work in this demo link)

# Instructions to start project:

Go to project folder where package.json stay


### Install node and npm:

verify you have stable version of node and npm installed. 


### Project Setup:

- Install all project dependencies, which are required for our project.

```
npm install
```

### Start development server:

```
npm run start.
```

### Make final build:

For production (live) ``[Base Url: '/']``:

```
npm run build
```

Above build commands create a new folder ``dist``.


# Instructions to use Applicaiton:

### Login:

- There are three default user you can use: (expity: 1 hour)
  - email: student@gmail.com, password: student, role: student
  - email: teacher@gmail.com, password: teacher, role: teacher
  - email: admin@gmail.com, password: admin, role: admin

- We are storing loggedIn user inside cookie, so we can retrieve current page state even after reload.


### Signup:

You can create any user with any role, duplicate emails are not allowed. Signup will be valid for only one hour.


### Main Page:

Only admin can use this page, From here admin can go into 'teacher panel' or 'student panel'.


### Student page:

- Student will see this page direclty after successfull login.
- Admin can come here from main dashboard.


### Teacher page:

- Teacher will see this page direclty after successfull login.
- Admin can come here from main dashboard.

