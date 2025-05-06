import React from 'react';
import ErrorPage from '../pages/ErrorPage'; // Import the new error page component

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Runtime error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />; // Render the new error UI
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
