import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

// Import Page Components.
import App from './App.tsx'
import DataSubjectView from './pages/data_subjects/DataSubjectView.tsx';
import DataSubjectEditor from './pages/data_subjects/DataSubjectEditor.tsx';
import NotFound from './pages/errors/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/data-subject",
    element: <DataSubjectView />,
  },
  {
    path: "/data-subject/new",
    element: <DataSubjectEditor />
  },
  {
    path: "/data-subject/:data_subject_id/edit",
    element: <DataSubjectEditor />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
