import React, { useContext } from "react";
import { SelectionsContext } from "../../../context/SelectionsContext";
import styles from './WheelSector.module.css';

const WheelSector = ({ onClick, id, breadcrumbIds, children, ...props }) => {
  const { selections } = useContext(SelectionsContext);
  const isSelected = selections?.includes(id);
  return (
    <g data-isSelected={isSelected} opacity={isSelected ? 1 : 0.5} className={styles.root} onClick={() => onClick(id)}>
      <path
        
        id={id}
        {...props}
      />
      {children}
    </g>
  );
};

export default WheelSector;
