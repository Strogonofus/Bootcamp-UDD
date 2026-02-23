import React from "react";
import ErrorState from "./ErrorState.jsx";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message ?? "Error desconocido" };
  }

  componentDidCatch(error, info) {
    // Puedes loggear aquí si quieres
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl p-6">
          <ErrorState
            title="Ups… algo falló al renderizar"
            message={this.state.message}
          />
        </div>
      );
    }
    return this.props.children;
  }
}