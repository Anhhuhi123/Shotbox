# ShotBox

## Project Overview
ShotBox is a web application for managing and storing images using Cloudinary. This project includes both front-end and back-end implementations.

---

## Front-end

### Environment Variables

Before running the front-end, create a `.env` file in the root directory of the `client` folder and set the following environment variables:


CLOUD_NAME=your-cloudinary-cloud-name

PRESET_NAME=your-upload-preset-name

FOLDER_NAME=your-folder-name


How to Get These Values from Cloudinary:
CLOUD_NAME:

Log in to Cloudinary.
In the dashboard, you will find the Cloud Name under Account Details.
PRESET_NAME:

Navigate to Settings > Upload in your Cloudinary dashboard.
Find the Upload Presets section.
Create a new preset (or use an existing one).
Copy the name of the preset and use it as PRESET_NAME.
FOLDER_NAME (optional):

This is the folder in Cloudinary where you want to store uploaded files.
If you don’t need a specific folder, leave this field blank.


---

## Back-end

### Environment Variables

Before running the back-end, create a `.env` file in the root directory of the `server` folder and set the following environment variables:

DATABASE=namedb

DATABASE_HOST=localhost

DATABASE_USER=root

DATABASE_PASSWORD=

JWT_SECRET=your-jwt-secret

JWT_EXPIRE=your-jwt-expiry-time

SENDGRID_API_KEY=your-sendgrid-api-key

## Setting Up the Project
Clone the Repository
Run the following command to clone the repository: https://github.com/NguyenQuocTien240103/ShotBox.git

Install Dependencies
Navigate to both the client and server directories and run: npm install

Configure Environment Variables
Create .env files in the client and server directories using the provided examples.

Start the Servers

1.Start the back-end server:

cd server

npm start
2.Start the front-end server:

cd client

npm start


