import { useEffect } from 'react';

export const useBlockScroll = ({
  ignoreBlockScroll = false,
  isOpen,
}: {
  isOpen: boolean;
  ignoreBlockScroll?: boolean;
}) => {
  useEffect(() => {
    if (isOpen && !ignoreBlockScroll) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [ignoreBlockScroll, isOpen]);
};

export default useBlockScroll;
