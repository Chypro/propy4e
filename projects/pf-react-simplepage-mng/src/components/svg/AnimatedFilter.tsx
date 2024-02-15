import React from 'react';
import { useAppSelector } from '../../store/store';
import { motion } from 'framer-motion';
type Props = {
  isOn: boolean;
  isHover: boolean;
};
const AnimatedFilter = ({ isOn, isHover }: Props) => {
  const { themeColor, primaryColor } = useAppSelector((state) => state.persist.themeReducer);
  return (
    <>
      <motion.div
        animate={isOn ? { rotate: 180 } : { rotate: 0 }}
        style={{ width: '20px', height: '20px', paddingTop: '0px' }}
        transition={{ type: 'spring' }}
      >
        <svg
          width="19"
          height="17"
          viewBox="0 0 18 14"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M8.00008 16C7.71675 16 7.47925 15.9042 7.28758 15.7125C7.09591 15.5208 7.00008 15.2833 7.00008 15V9L1.20008 1.6C0.95008 1.26667 0.91258 0.916667 1.08758 0.55C1.26258 0.183333 1.56675 0 2.00008 0H16.0001C16.4334 0 16.7376 0.183333 16.9126 0.55C17.0876 0.916667 17.0501 1.26667 16.8001 1.6L11.0001 9V15C11.0001 15.2833 10.9042 15.5208 10.7126 15.7125C10.5209 15.9042 10.2834 16 10.0001 16H8.00008ZM9.00008 8.3L13.9501 2H4.05008L9.00008 8.3Z"
            fill={
              isHover
                ? themeColor[primaryColor][500]
                : isOn && !isHover
                  ? themeColor[primaryColor][900]
                  : themeColor[primaryColor][100]
            }
            transition={{ duration: 0.8, type: 'spring' }}
          />
        </svg>
      </motion.div>
    </>
  );
};

export default AnimatedFilter;
