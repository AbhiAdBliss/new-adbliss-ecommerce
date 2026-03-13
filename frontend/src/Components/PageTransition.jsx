import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const LOADING_DURATION = 1500;

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;

    //   setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, LOADING_DURATION);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  if (loading) return <LoadingPage />;
  return children;
};

export default PageTransition;