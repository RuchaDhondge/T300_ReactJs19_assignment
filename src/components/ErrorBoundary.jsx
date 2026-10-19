import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="state-message error">
          <h3>Unable to load products</h3>
          <p>{this.state.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
