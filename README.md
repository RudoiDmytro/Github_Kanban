# GitHub Issues Kanban Board

A simple React application that displays GitHub repository issues as a Kanban board, allowing users to visualize and manage their workflow.

## Features

*   **Repository Issue Loading:** Enter a GitHub repository URL to load its issues using the GitHub API.
*   **Kanban Board:** Displays issues in three columns: To Do, In Progress, and Done.
*   **Drag-and-Drop:**  Drag and drop issues between columns to update their status.
*   **Persistence:** Saves the Kanban board state (column and order of issues) in local storage, so changes persist across browser sessions and searches.
*   **Repository and Owner Links:** Provides links to visit the repository and its owner's profile on GitHub.
*   **Responsive Design:** Adapts to different screen sizes with a responsive layout.
*   **Animations:**  Adds delightful animations using CSS and simple calculations, making the board more interactive.

## Technologies

*   **React 18:**  A JavaScript library for building user interfaces.
*   **TypeScript:**  A typed superset of JavaScript.
*   **Ant Design:**  A React UI library.
*   **Zustand:**  A small, fast, and scalable bearbones state-management solution.
*   **@hello-pangea/dnd:** A Drag and Drop library.
*   **Axios:** Promise based HTTP client for the browser and node.js

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/RudoiDmytro/Github_Kanban
    cd Github_Kanban
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev # or yarn run dev
    ```

    Open your browser and navigate to `http://localhost:3000`. (or the port specified on your console)

## Running Tests

1.  **Ensure the app is running** `npm run dev`.
2.  **Open Cypress:**

    ```bash
    npx cypress open
    ```

3.  **Run the tests.**

## Usage

1.  Enter the GitHub repository URL in the input field at the top of the page (e.g., `https://github.com/facebook/react`).
2.  Click the "Load" button.
3.  The application will fetch the issues from the repository and display them in the Kanban board columns based on their status:
    *   **To Do:** New issues or issues without an assignee.
    *   **In Progress:** Issues that are currently being worked on (assigned to someone).
    *   **Done:** Closed issues.
4.  Drag and drop issues between columns to change their status.  The changes will be saved in local storage.
5.  Click the links below the input field to visit the repository owner's profile or the repository itself on GitHub.

## Key Components

*   **`RepoInput.tsx`:**  Handles the input of the GitHub repository URL and triggers the issue loading process.
*   **`KanbanBoard.tsx`:**  Renders the Kanban board with the three columns.
*   **`KanbanColumn.tsx`:**  Renders each column of the Kanban board and handles drag-and-drop functionality.
*   **`IssueCard.tsx`:**  Renders each individual issue card, displaying its title, author, and other relevant information.
*   **`useKanbanStore.ts`:**  Zustand store that manages the application state (repository URL, issues, column assignments).
