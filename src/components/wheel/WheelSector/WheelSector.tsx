import React, { useContext } from "react";
import { SelectionsContext } from "../../../context/SelectionsContext";
import styles from './WheelSector.module.css';
import { HistoryContext } from "../../../context/HistoryContext";

const WheelSector = ({ onClick, id, breadcrumbIds, children, ...props }) => {
  const { selections } = useContext(SelectionsContext);
  const tastingHistory = useContext(HistoryContext);
  const lastTasting = tastingHistory[0];
  console.log('last tasting : ', lastTasting);
  const isSelected = selections?.includes(id);
  const flavourWasInLastTasting = lastTasting && lastTasting.details.flavors.includes(id) ? true : false;
  console.log(flavourWasInLastTasting);
  return (
    <g data-isSelected={isSelected} opacity={isSelected ? 1 : flavourWasInLastTasting ? 0.5 : 0.25} className={styles.root} onClick={() => onClick(id)}>
      <path
        
        id={id}
        {...props}
      />
      {children}
    </g>
  );
};

export default WheelSector;
