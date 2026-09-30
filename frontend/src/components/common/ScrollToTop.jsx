import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ponytail: native window.scrollTo on route changes ensures pages never start pre-scrolled
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname, search]);

  return null;
}
