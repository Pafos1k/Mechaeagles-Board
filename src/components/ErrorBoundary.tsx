import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    (this as any).state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const self = this as any;
    if (self.state.hasError) {
      let errorMessage = 'Something went wrong.';
      try {
        const parsedError = JSON.parse(self.state.error?.message || '{}');
        if (parsedError.error) {
          errorMessage = `Firestore Error: ${parsedError.error} (Op: ${parsedError.operationType}, Path: ${parsedError.path})`;
        }
      } catch {
        errorMessage = self.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4">
          <div className="bg-dark-card border border-maroon p-8 rounded-2xl max-w-lg w-full text-center">
            <h2 className="text-2xl font-display font-bold text-maroon mb-4">System Error</h2>
            <p className="text-gray-400 mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-maroon hover:bg-maroon-light text-white px-6 py-2 rounded-full transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return self.props.children;
  }
}
