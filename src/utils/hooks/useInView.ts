import React from 'react';

export const useInView = (options?: IntersectionObserverInit) => {
  const ref = React.useRef<$TSFixMe>(null);
  const [isInView, setInView] = React.useState(false);

  const setRef = React.useCallback((node: Element | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    ref.current = observer.observe(node);
  }, []);

  return { isInView, ref: setRef };
};
