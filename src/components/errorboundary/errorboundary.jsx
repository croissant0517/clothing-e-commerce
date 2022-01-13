import React from "react";

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from "./errorboundary.style";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // 更新 state 以至於下一個 render 會顯示 fallback UI
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // 你也可以把錯誤記錄到一個錯誤回報系統服務
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // 你可以 render 任何客製化的 fallback UI
        return (
          <ErrorImageOverlay>
            <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
            <ErrorImageText>Sorry, this Page is Lost in Space...</ErrorImageText>
          </ErrorImageOverlay>
        );
      }
  
      return this.props.children;
    }
}

export default ErrorBoundary;