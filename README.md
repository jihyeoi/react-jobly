# Jobly
Jobly is a full-stack job application portal built with React on the frontend and a Node.js/Express backend. The app allows users to browse job listings, apply for jobs, and manage their profiles.

## Features

- **User Authentication**: Secure login, registration, and logout functionality.
- **Company Listings**: Users can view a list of companies / search for a specific company, and click into them for company-specific jobs.
- **Job Listings**: Users can view a list of jobs and search for specific jobs.
- **Job Applications**: Authenticated users can apply for jobs.
- **My Jobs**: Authenticated users can view the jobs they've applied to.
- **User Profile**: Users can view and update their profile information.

## Technologies Used
- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: JWT for secure token-based authentication
- **Styling**: CSS with support for mobile and desktop views

# Installation
**Note**: Backend must be installed for the front end to work, as front end uses API calls to the back end to generate data. Instructions for backend installation are [here](https://github.com/jihyeoi/express-jobly-backend). 

1. **Clone the repository**
   ```bash
   git clone https://github.com/jihyeoi/jobly.git
   cd jobly
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start server**
   ```bash
   npm start
   ```
   This command will start the frontend on `localhost:3000` and should automatically open a browser window with the app.

## Usage

After installing, you can register as a new user or log in with existing credentials. Once logged in, you can view job listings, apply for jobs, and update your profile.

Project Link: [https://github.com/jihyeoi/react-jobly](https://github.com/jihyeoi/react-jobly)

   
