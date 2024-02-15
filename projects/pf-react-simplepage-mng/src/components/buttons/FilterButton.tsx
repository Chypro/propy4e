import { Button, ButtonProps } from 'antd';
import React, { useState } from 'react';
import AnimatedFilter from '../svg/AnimatedFilter';
type Props = {
  ButtonProps?: ButtonProps;
  label: string;
};
const FilterButton = ({ ButtonProps, label }: Props) => {
  const [isOn, setisOn] = useState(true);
  const [isHover, setisHover] = useState(true);
  return (
    <>
      <Button
        onMouseOver={() => setisHover(true)}
        onMouseLeave={() => setisHover(false)}
        onClick={() => setisOn((pre) => !pre)}
        type={isOn ? 'default' : 'primary'}
        icon={<AnimatedFilter isOn={isOn} isHover={isHover}></AnimatedFilter>}
        {...ButtonProps}
      >
        {label}
      </Button>
    </>
  );
};

export default FilterButton;
