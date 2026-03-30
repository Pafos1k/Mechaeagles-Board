/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Home from './pages/Home';
import TeamPage from './pages/TeamPage';
import Contacts from './pages/Contacts';
import Tasks from './pages/Tasks';
import NewsPage from './pages/NewsPage';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from './firebase';
import { doc, getDocFromServer } from 'firebase/firestore';

// Set scroll restoration to manual to prevent browser from jumping around
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export default function App() {
  // Test connection to Firestore as required by guidelines
  useEffect(() => {
    async function testConnection() {
      const path = 'test/connection';
      try {
        await getDocFromServer(doc(db, path));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        } else {
          // For other errors (like permission denied), use the standard handler
          handleFirestoreError(error, OperationType.GET, path);
        }
      }
    }
    testConnection();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team/:teamId" element={<TeamPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

