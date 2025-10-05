# Web-Development-II
A dynamic full-stack Web application for managing and discovering community charity activities.   This platform connects charitable organizations with potential participants through an intuitive interface and a powerful back-end system.

Functional features
Event Discovery: Browse upcoming charity events and detailed information

Advanced Search: Filter events by category, location, and date

Real-time data: Dynamically load content via RESTful API

Responsive design: Compatible with all device sizes

Fundraising tracking: A visual progress indicator for donation goals

Technology stack
Front-end: HTML5, CSS3, native JavaScript

Back end: Node.js, Express.js

Database: MySQL

API: RESTful architecture

Project structure
text
Charity event platform
├── client/
│   ├── index.html
│   ├── search.html
│   ├── event-details.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── main.js
│       ├── home.js
│       ├── search.js
│       └── event-details.js
├── server.js
├── event_db.js
├── init_database.js
└── package.json
🚦 How to run the application
Prerequisites
The system has Node.js installed

Run the MySQL server locally

Git for version control

Gradually set up
Start the backend server

bash
Navigate to the project directory in the VSCode terminal
node server.js
You should see:

text
The server is running at http://localhost:3000
API documentation: http://localhost:3000
Startup time: [Current time
Initialize the database (first setup)

bash
Run in the new terminal TAB:
node init_database.js
Visit the website

Keep the server running in the terminal

Open File Explorer and navigate to the client folder

Double-click index.html to open it in your browser


Important Note
The server must be running: The website requires the backend server to be active.   If you close the terminal running node server.js, the website will stop working.
My website needs to enter cmd, npm install and npm start in sequence in the terminal in order to open it from index.html in the folder

Database connection: Ensure that MySQL is running and that the database credentials in event_db.js match your local Settings.

Access entry
Home Page: client/index.html - The main login page, including the list of activities

search: client/search.html - Advanced event search and filtering

API documentation: http://localhost:3000 - backend API endpoint

API endpoint
GET /api/events/home - Get upcoming events

GET /api/categories - Get activity categories

GET /api/events/search - Use filters to search for events

GET /api/events/:id - Get details of a specific event
