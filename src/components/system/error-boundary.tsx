"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <svg className="h-6 w-6" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M8.4449 2.60817C8.0183 1.79415 6.9817 1.79415 6.55509 2.60817L1.16172 12.75C0.745353 13.5448 1.32846 14.5 2.2606 14.5H12.7394C13.6715 14.5 14.2546 13.5448 13.8383 12.75L8.4449 2.60817Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.5 5.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7.5 11.5C7.77614 11.5 8 11.2761 8 11C8 10.7239 7.77614 10.5 7.5 10.5C7.22386 10.5 7 10.7239 7 11C7 11.2761 7.22386 11.5 7.5 11.5Z" fill="currentColor" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-foreground">Something went wrong</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button className="mt-4" variant="secondary" onClick={this.handleReset}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1.84998 7.49998C1.84998 4.66416 4.05979 1.53151 7.49998 1.53151C10.2783 1.53151 12.4202 3.54229 13.1375 5.49998M13.15 1.84998V5.49998H9.49998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.15 7.49998C13.15 10.3358 10.9402 13.4685 7.49998 13.4685C4.72166 13.4685 2.57979 11.4577 1.86249 9.49998M1.84998 13.15V9.49998H5.49998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
