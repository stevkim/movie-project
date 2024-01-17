<a href='readme-top'></a>

<h1 align='center'>Moovi</h1>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href='#about'>About</a>
      <ul>
        <li>
          <a href='#built-with'>Built With</a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#setup'>Getting Set-up</a>
      <ul>
        <li>
          <a href='#prereq'>Prerequisites</a>
        </li>
        <li>
          <a href='install'>Installation</a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#features'>Features</a>
    </li>
    <li>
      <a href='#visuals'>Application Visuals</a>
    </li>
  </ol>
</details>

# About
<a id='about'></a>
Moovi is a pinterest-like movie application that allows users to search, save, browse movies and tv shows. The user must create an account, thereafter the user may search for and save movies linked to their account and come back to it later. 
The user may also update their preferences and have the application display movies/shows specific to their settings.

## Built With
<a id='built-with'></a>
<p>
Moovi was developed with the integration of <a href='https://developer.themoviedb.org/docs/getting-started' target='_blank'>TMDB</a>, a movie database API.
</p>

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React-Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

<p align='right'>  
  <a href='#readme-top'>back to top</a>
</p>

# Getting Set-up
<a id='setup'></a>

## Prerequisites
<a id='prereq'></a>
<p>
  To run Moovi, you must have the server running on a separate port. You can find the backend server <a href='https://github.com/stevkim/movie-app-backend' target='_blank'>here.</a>
</p>

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

```
npm install npm@latest -g
```
## Installation
<a id='install'></a>

1. Clone the repo
```
git clone https://github.com/stevkim/movie-project
```
2. Install NPM packages
```
npm install
```
3. Create a `.env` in root folder and add environment variables
```
VITE_API_TOKEN=(movie api access token)

```
4. Run the application
```
npm run dev
```
<p align='right'>  
  <a href='#readme-top'>back to top</a>
</p>

# Features
- [x] Account CRUD - Create, read, update, delete
- [x] Integrated API to get media information
- [x] Fetch relevant media based on account preferences
- [x] Custom authentication using JWT
- [x] Session persistence with JWT stored in cookies
- [x] Fluid animations using <a href='https://www.framer.com/motion/' target='_blank'> Framer Motion</a>
- [x] Redux/toolkit for state management for state predicability
- [x] Form validation with <a href='https://formik.org/' target='_blank'> Formik</a> library

<p align='right'>  
  <a href='#readme-top'>back to top</a>
</p>

# Application Visuals
<a id='visuals'></a>
<img src='https://github.com/stevkim/movie-project/blob/main/gifs/home.gif' />
<img src='https://github.com/stevkim/movie-project/blob/main/gifs/preferences.gif' />
<img src='https://github.com/stevkim/movie-project/blob/main/gifs/search.gif' />

<p align='right'>  
  <a href='#readme-top'>back to top</a>
</p>





