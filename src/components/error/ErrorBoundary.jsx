import React from "react";

import ErrorPage from "./ErrorPage";

// ErrorBoundary must be a class component per React API
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You could log to an external service here
    // For now, store error info in state for debugging
    this.setState({ errorInfo });
    console.error("Uncaught error in React tree:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the existing ErrorPage as a fallback UI
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
