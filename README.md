
# WorkGenius Web Developer test exercise
[![Docker Image CI](https://github.com/memoryInject/webdev_exercise/actions/workflows/docker-image.yml/badge.svg)](https://github.com/memoryInject/webdev_exercise/actions/workflows/docker-image.yml)

Test for full-stack development

**Note: This project developed and tested on Ubuntu 20.04 LTS, Some of the environment setup might be different on MacOS and Windows.**

## Tech Stack

**Frontend:** Next.js, TypeScript   
**Backend :** Python, Django, Sqlite3

**Frontend Test:** Vitest with [MSW](https://mswjs.io/)   
**Backend Test:** Pytest

**Linter Frontend:** ESLint    
**Formatter Frontend:** Prettier

**Linter Backend:** flake8    
**Formatter Backend:** Black   
**Static type checker Backend:** Pyright

**CI:** Github Actions


## File structure
```bash
.
├── README.md
├── compose
│   ├── local
│   └── test
├── docker-compose.yml
├── frontend
│   ├── README.md
│   ├── next-env.d.ts
│   ├── public
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── next.config.js
│   └── src
├── docker-compose.test.yml
└── backend
    ├── manage.py
    ├── __pycache__
    ├── conftest.py
    ├── pytest.ini
    ├── requirements.txt
    ├── config
    └── main

```
From root of the project directory,   
**frontend:** `./frontend`  
**backend:** `./backend`
## Environment Variables

There is no Environment var to setup.
## Installation

Frontend is build with Next.js with SSR and Typescript.    
Backend is build with Python and Django.   

Tested with:    
Node version: v19.4.0  
Python version: 3.10.5

**(No need to install these if running under Docker)**


### Development
There are two ways to run this project   
 - Run locally 
 - Run with docker

### Run Locally (without Docker, if running docker skip this part)

After all the environment setup, go to the frontend directory and install npm packages.
```bash
  cd frontend
  npm install
```
Then go to the backend directory (assuming already setup a python virtual environment) and install pip packages
```bash
  cd backend
  pip install -r requirements.txt
```

Once both frontend and backend packages installed successfully go to backend and migrate the database, seed the data and run the server.
```bash
  cd backend
  python manage.py migrate
  python manage.py seed_data
  python manage.py runserver
```

Then open another terminal and go to the frontend directory for running client.
```bash
  cd frontend
  npm run dev
```

After successfully running these two development servers, got to `http://localhost:3000` to see the project in a browser.    
**Note: client server running on port 3000 and backend running on port 8000** 

### Run with Docker (Recommended option)
If running under docker follow the steps below:  

Open a new terminal at the root of the project and run the command (Make sure docker is running and run this command at the root).
```bash
  ./compose/local/bin/up-build.sh
```
For windows run this command instead of the command above, also make sure that run this command at root directory:
```bash
  docker-compose up --build
```
After successfully build and up the docker, got to http://localhost:3000 to see the project in a browser.  

There are lots of commands available in `./compose/local/bin/` for checking logs, shell to the container etc.  
## Running Tests
There are two ways to run the test  
 - Run locally
 - Run with docker

### Run test locally

To run tests, go to the frontend `cd frontend`

```bash
  npm run test
```

For backend tests, go to the backend `cd backend`

```bash
  pytest
```

### Run test with Docker

To run tests, make sure the current working directory is the root of this project then run this command    

```bash
  ./compose/test/bin/up-build.sh
```
## API Reference
All the API documentations are available at: `http://localhost:8000/api/v1/docs/`
## Usage/Examples
### Add skill and filter user
- Go to http://localhost:3000 in a browser
- Click `Manage Users`
- Now it shows lists of user
- Click edit user button (which is at Action column for each user)
- Add/remove skills at user edit page
- go back to user list page 
- Check skill filter and search the skill added before

### Create new user
- Go to http://localhost:3000/users/new in a browser

### Admin control
- Since it build with Django it comes with admin panel
- Go to http://localhost:3000 in a browser
- Click the Admin button in the header it will redirect to `http://localhost:8000/admin`
- If you seed the data before, the admin credentials are: username `admin` password: `1234`


## Additional Notes
 - Frontend build with Next.js, routes `http://localhost:3000/users` and `http://localhost:3000/users/:userId` are Server Side Rendered for better performance and SEO friendly. Enven though those two routes are SSR, it also update with SPA mode when deleting an user or update user skills that make it more interactive and get benefits from both technologies.

## Screenshots
#### DB Diagram
<img src="https://user-images.githubusercontent.com/72661846/219352416-1db338ae-f537-4410-b3d2-c5297d7d2fba.png" width="800">

#### Home Page
<img src="https://user-images.githubusercontent.com/72661846/219349663-278c12ba-3a96-424f-a418-b6671ea9d30a.png" width="800">

#### Users Page
<img src="https://user-images.githubusercontent.com/72661846/219350130-145a42ec-bd5b-4f92-9202-be702ef2557f.png" width="800">

#### Users Profile Page
<img src="https://user-images.githubusercontent.com/72661846/219350324-26ede575-7682-4aad-b0ae-ba15f8b7e5c1.png" width="800">
