# Personal Task Tracker

## Description
This is a simple yet feature-rich personal task management application built with React. It allows users to manage their daily tasks efficiently, with functionalities for adding, editing, deleting, and tracking completion status. All task data and user preferences (like dark mode) are persisted in the browser's local storage.

## Features
* **Simple Login**: Basic username input, with the username stored locally for persistence.
* **Task Management**:
    * Add new tasks with a title (required) and an optional description.
    * Edit existing tasks inline, including title, description, priority, due date, and categories.
    * Delete tasks with a confirmation prompt.
    * Toggle task completion status via a checkbox.
* **Task Display**:
    * Show task title, description, and completion status.
    * Display creation date/time.
    * Visual distinction between completed and pending tasks.
    * **Task Priority**: Assign and display tasks with 'Low', 'Medium', or 'High' priority, with visual cues.
    * **Due Dates**: Set and display optional due dates for tasks, with visual indication for overdue tasks.
    * **Task Categories/Tags**: Assign multiple categories (e.g., "Work", "Personal") to tasks, displayed as tags.
* **Task Filtering**:
    * Tabs for filtering tasks by "All", "Completed", and "Pending".
    * Show task count for each filter category.
* **Search Functionality**: Search tasks by title, description, or categories.
* **Data Persistence**: All tasks and the last-used username, along with the dark mode preference, are saved in `localStorage` and persist across browser sessions.
* **User Interface**:
    * Responsive design for optimal viewing on mobile and desktop devices.
    * Clean, intuitive, and user-friendly interface.
    * **Dark Mode Toggle**: Switch between light and dark themes for improved visual comfort.
    * **Smooth Animations/Transitions**: Subtle CSS transitions applied for a smoother user experience (e.g., button hovers, element changes).

## Setup Instructions
To get this project up and running on your local machine:

1.  **Clone the repository**:
    ```bash
    git clone <your-github-repo-url>
    cd task-tracker
    ```
    (Replace `<your-github-repo-url>` with the actual URL of your GitHub repository.)

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm start
    ```

4.  **Open in browser**:
    Your application should now be running at `http://localhost:3000`.

## Technologies Used
* **React.js**: Frontend JavaScript library for building user interfaces.
* **CSS**: For styling and responsive design.

## Live Demo
https://tracker12345.netlify.app/

## Screenshots
![{2F2D5CA3-E4A9-4920-99C8-84BF2FA84313}](https://github.com/user-attachments/assets/7214b85f-c9b7-4633-b9fc-009d8b466f49)
![{6386F515-8BBF-4603-937B-A91D757481FC}](https://github.com/user-attachments/assets/f85b92dc-bbcb-4b50-9265-78c01103ad92)


