import { Component } from "react";

/**
 * Top-level Error Boundary.
 * Any render-time throw anywhere in the tree is caught here and shown as a
 * visible fallback (with the error message) instead of a blank white page.
 * This is the production safety net against the "white screen" class of bugs.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught a render error:", error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-portfolio-bg p-8 text-portfolio-text">
          <h1 className="font-display text-2xl font-bold text-red-400 mb-2">
            The page hit an unexpected error.
          </h1>
          <p className="text-sm text-portfolio-subtext mb-4">
            Instead of a blank screen, this message is shown. The error below
            points to the crashing component.
          </p>
          <pre className="mt-3 max-w-3xl whitespace-pre-wrap break-all rounded-xl border border-portfolio-border bg-portfolio-surface/70 p-4 text-sm text-red-300">
            {this.state.error?.message}
          </pre>
          <p className="mt-4 text-xs text-portfolio-muted">
            Check DevTools → Console for the full component stack (ErrorBoundary).
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;