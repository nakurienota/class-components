import {Component} from "react";
import type {ErrorProperties, ErrorState} from "../../types";
import './ErrorBoundary.scss';

class ErrorBoundary extends Component<ErrorProperties, ErrorState> {
    state: ErrorState = {hasError: false, error: null};

    static getDerivedStateFromError(error: Error): ErrorState {
        return {hasError: true, error};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        console.error('Error caught:', error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error">
                    <h2>Something goes wrong</h2>
                    <p>{this.state.error?.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;