# React Native Expo App

BookFinder is a React Native app built for a thesis project. The app allows users to search for books using an API, manage a personal booklist, and authenticate using Firebase. It also includes features like audio-based search using Whisper API, responsive design, and smooth navigation between screens.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Development Log](#development-log)
- [Known Issues](#known-issues)
- [Licenses](#licenses)

---

## Overview

This app was developed as part of my thesis work during my internship (LIA). The project began with early design work in Figma and has evolved into a functioning mobile application with real-time book searching, user authentication, and personalized booklist management. The app follows an agile workflow with proper planning, branching, and issue tracking through Trello and GitHub Projects.

---

## Installation

```bash
# Clone the repository
git clone https://github.com/hampus-code/thesis-epigraph.git
cd epigraph

# Install dependencies
npm install

# Start Expo
npx expo start

```

## Running the app

```bash
# Start Expo
npx expo start

```

## Features

- Firebase Authentication (Login/Register)
- Search for books using an external book API
- Add/remove books from your personal booklist (stored in Firestore)
- Voice search using Whisper API via Lemonfox.ai (30 hours/month free)
- Responsive and mobile-friendly design
- Book & Author Cards with modals for extra info
- Bottom tab navigation and screen routing
- Zustand for state management
- API handled with `react-query` and `useInfiniteQuery`
- Book covers, author information, and user interface stored efficiently
- Clean and organized folder structure

---

## Tech Stack

- **Frontend**: React Native, Expo Go, TypeScript
- **Authentication & Backend**: Firebase Authentication, Firestore
- **API Management**: TanStack Query (`react-query`), Axios
- **Voice Input**: Expo Audio + Whisper API (via Lemonfox.ai)
- **Navigation**: React Navigation
- **State Management**: Zustand
- **Design**: Figma (initial designs), Custom Components
- **Project Management**: Trello, GitHub Projects
- **Version Control**: Git, GitHub (with feature branches)
- **Other Tools**: AsyncStorage, .env for secret management

---

## Licenses

All dependencies and their licenses can be found in LICENSES.md.
