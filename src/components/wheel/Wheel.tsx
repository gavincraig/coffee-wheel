import React, { useState } from "react";
import styles from "./wheel.module.css";
import wheelData from "./wheel-data.json";
import { WheelSector } from "../WheelSector";
import { SelectionsContext } from "../../context/SelectionsContext";

const Wheel = () => {
  const [flavourBreadcrumb, setFlavourBreadcrumb] = useState([]);
  const [selections, setSelections] = useState([]);

  const breadcrumbIds = flavourBreadcrumb?.map((breadcrumb) => breadcrumb.id);

  const computeSelectionBreadcrumb = (id) => {
    const breadcrumb = [];

    const checkItemsForIdRecursive = (items, id) => {
      let idx = 0;
      let foundElement;

      while (idx < items.length) {
        const currentItem = items[idx];
        breadcrumb.push(currentItem);
        if (currentItem.id === id) {
          return { breadcrumb, currentItem };
        }
        if (currentItem.children?.length > 0) {
          const recursiveResult = checkItemsForIdRecursive(
            currentItem.children,
            id,
            breadcrumb
          );
          if (recursiveResult) {
            return recursiveResult;
          }
        }
        breadcrumb.pop();
        idx += 1;
      }
      return false;
    };
    return checkItemsForIdRecursive(wheelData, id, breadcrumb);
  };

  const handlePathClick = (id) => {
    const { breadcrumb, currentItem } = computeSelectionBreadcrumb(id);
    if (selections.includes(currentItem.id)) {
      console.log("aready selected");
      setSelections((selections) =>
        selections.filter((flavour) => flavour !== currentItem.id)
      );
    } else {
      setSelections((selections) => [currentItem.id, ...selections]);
    }
    setFlavourBreadcrumb(breadcrumb);
  };

  const BreadcrumbSection = ({ flavour }) => {
    return (
      <li style={{ backgroundColor: flavour.color }}>{flavour.displayName}</li>
    );
  };

  const FullBreadcrumbSection = ({ flavour }) => {
    return (
      <li style={{ backgroundColor: flavour.color, width: 'fit-content' }}>{flavour.displayName}</li>
    );
  };

  const FullBreadcrumb = () => {
    return(
      <ol>
        {
          selections.map(selection => {
            const flavourBreadcrumb = computeSelectionBreadcrumb(selection);
            console.log(flavourBreadcrumb);
            return <FullBreadcrumbSection flavour={flavourBreadcrumb.breadcrumb.slice(-1)[0]}/>
          })
        }
      </ol>
    )
  }

  return (
    <>
      <button onClick={() => console.log(selections)}>log select</button>
      <FullBreadcrumb />
      <ol className={styles.breadcrumb}>
        {flavourBreadcrumb?.map((flavour) => (
          <BreadcrumbSection flavour={flavour} />
        ))}
      </ol>
      <SelectionsContext.Provider value={{ selections }}>
        <svg
          className={styles.wheel}
          xmlns="http://www.w3.org/2000/svg"
          id="wheel"
          viewBox="0 0 755.99 754.34"
        >
          <g className={styles.primaryGroup} id="fruity-primary">
            <WheelSector
              id="fruity"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#da1d23"
              d="M390 219.43a170.57 170.57 0 0 1 162.75 119.49l-96.65 30.34a69.28 69.28 0 0 0-66.1-48.53Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(415.56 308.58) rotate(-53.21)"
              >
                Fruity
              </text>
            </WheelSector>
            <g className={styles.secondaryGroup}>
              <WheelSector
                id="berry"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#dd4c51"
                d="M390 101.05a288.74 288.74 0 0 1 80.27 11.37l-32.89 113.72a170.68 170.68 0 0 0-47.38-6.71Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#fff"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="matrix(0.15, -0.99, 0.99, 0.15, 395.43, 192.42)"
                >
                  Berry
                </text>
              </WheelSector>
              <WheelSector
                id="blackberry"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#3e0317"
                d="M390 80q10.9 0 21.8.77l-1.48 21q-10.14-.72-20.32-.71Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#3e0317"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(382.34 57.08) rotate(-87.48)"
                >
                  Blackberry
                </text>
              </WheelSector>
              <WheelSector
                id="raspberry"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#e52968"
                d="M411.8 80.77q10.88.77 21.69 2.3l-3 20.83q-10.06-1.43-20.21-2.14Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#e52968"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(404.35 58.99) rotate(-83.45)"
                >
                  Raspberry
                </text>
              </WheelSector>
              <WheelSector
                id="blueberry"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#6469b0"
                d="M433.49 83.07q10.8 1.53 21.47 3.81l-4.41 20.58q-9.94-2.13-20-3.56Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#6469b0"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="matrix(0.18, -0.98, 0.98, 0.18, 426.17, 62.45)"
                >
                  Blueberry
                </text>
              </WheelSector>
              <WheelSector
                id="strawberry"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#ef2d36"
                d="M455 86.88q10.67 2.3 21.15 5.32l-5.84 20.22q-9.78-2.82-19.72-5Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#ef2d36"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(447.69 67.43) rotate(-75.39)"
                >
                  Strawberry
                </text>
              </WheelSector>
              <WheelSector
                id="dried-fruit"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#c94a44"
                d="M470.27 112.42a290.71 290.71 0 0 1 38.14 14l-48.51 108a170.07 170.07 0 0 0-22.52-8.27Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#fff"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(432.12 202.51) rotate(-69.34)"
                >
                  Dried fruit
                </text>
              </WheelSector>
              <WheelSector
                id="raisin"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#b53b54"
                d="M476.11 92.2q10.49 3 20.73 6.79l-7.25 19.76q-9.55-3.51-19.32-6.33Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#b53b54"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(468.81 73.92) rotate(-71.36)"
                >
                  Raisin
                </text>
              </WheelSector>
              <WheelSector
                id="prune"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#a5446f"
                d="M496.84 99q10.25 3.77 20.2 8.24l-8.63 19.19q-9.27-4.17-18.82-7.67Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#a5446f"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="matrix(0.39, -0.92, 0.92, 0.39, 489.42, 81.87)"
                >
                  Prune
                </text>
              </WheelSector>
              <WheelSector
                id="other-fruit"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#f2684c"
                d="M508.41 126.42a289 289 0 0 1 122.4 103.88l-98.66 65.43a170.51 170.51 0 0 0-72.25-61.32Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#fff"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="matrix(0.65, -0.76, 0.76, 0.65, 486.02, 235.54)"
                >
                  Other fruit
                </text>
              </WheelSector>
              <WheelSector
                id="coconut"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#d07c36"
                d="M517 107.23q9.94 4.47 19.57 9.63l-10 18.54q-9-4.8-18.24-9Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#d07c36"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(509.41 91.25) rotate(-63.29)"
                >
                  Coconut
                </text>
              </WheelSector>
              <WheelSector
                id="cherry"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#e73451"
                d="M536.61 116.86q9.6 5.16 18.84 11l-11.23 17.8q-8.61-5.43-17.57-10.24Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#e73451"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(528.7 102.01) rotate(-59.26)"
                >
                  Cherry
                </text>
              </WheelSector>
              <WheelSector
                id="pomegranate"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#e65656"
                d="M555.45 127.84q9.22 5.82 18 12.28l-12.45 17q-8.21-6-16.8-11.45Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#e65656"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(547.19 114.1) rotate(-55.23)"
                >
                  Pomegranate
                </text>
              </WheelSector>
              <WheelSector
                id="pineapple"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#f89a1c"
                d="M573.47 140.12q8.79 6.47 17.12 13.52L577 169.69q-7.76-6.58-16-12.6Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#794b0d"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(564.78 127.47) rotate(-51.2)"
                >
                  Pineapple
                </text>
              </WheelSector>
              <WheelSector
                id="grape"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#aeb92c"
                d="M590.59 153.64q8.31 7.06 16.12 14.69l-14.71 15q-7.28-7.11-15-13.69Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#555a15"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(581.38 142.04) rotate(-47.16)"
                >
                  Grape
                </text>
              </WheelSector>
              <WheelSector
                id="apple"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#4eb947"
                d="M606.71 168.33q7.8 7.63 15 15.79L606 198.1q-6.76-7.6-14-14.72Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#4eb947"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(596.92 157.73) rotate(-43.13)"
                >
                  Apple
                </text>
              </WheelSector>
              <WheelSector
                id="peach"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#f68a5c"
                d="M621.76 184.12q7.25 8.16 13.9 16.8L619 213.76q-6.19-8.06-13-15.66Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#78432d"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(611.32 174.49) rotate(-39.1)"
                >
                  Peach
                </text>
              </WheelSector>
              <WheelSector
                id="pear"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#baa635"
                d="M635.66 200.92q6.66 8.66 12.69 17.74l-17.54 11.64q-5.62-8.48-11.83-16.54Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#baa635"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(624.51 192.21) rotate(-35.07)"
                >
                  Pear
                </text>
              </WheelSector>
              <WheelSector
                id="citrus-fruit"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#f7a129"
                d="M630.81 230.3a289.05 289.05 0 0 1 34.89 73.18l-113 35.44a170.63 170.63 0 0 0-20.6-43.19Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#fff"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(530.85 296.52) rotate(-24.99)"
                >
                  Citrus fruit
                </text>
              </WheelSector>
              <WheelSector
                id="grapefruit"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#f26355"
                d="M648.35 218.66q6 9.1 11.41 18.59l-18.32 10.37q-5-8.84-10.63-17.32Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#f26355"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="matrix(0.86, -0.52, 0.52, 0.86, 636.41, 210.82)"
                >
                  Grapefruit
                </text>
              </WheelSector>
              <WheelSector
                id="orange"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#e2631e"
                d="M659.76 237.25q5.37 9.5 10.07 19.35l-19 9.06q-4.38-9.18-9.39-18Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#e2631e"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(646.98 230.21) rotate(-27)"
                >
                  Orange
                </text>
              </WheelSector>
              <WheelSector
                id="lemon"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#fde402"
                d="M669.83 256.6q4.7 9.84 8.69 20l-19.59 7.69q-3.72-9.45-8.1-18.64Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#7b6f00"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(656.16 250.31) rotate(-22.97)"
                >
                  Lemon
                </text>
              </WheelSector>
              <WheelSector
                id="lime"
                onClick={handlePathClick}
                breadcrumbIds={breadcrumbIds}
                fill="#7eb138"
                d="M678.52 276.61q4 10.14 7.26 20.56l-20.08 6.31q-3-9.71-6.77-19.18Z"
                transform="translate(-23.83 -19.37)"
              >
                <text
                  fill="#7eb138"
                  font-family="ArialMT, Arial"
                  font-size="12"
                  style={{ isolation: "isolate" }}
                  transform="translate(663.9 270.99) rotate(-18.94)"
                >
                  Lime
                </text>
              </WheelSector>
            </g>
            <g id="fruity-text"></g>
          </g>
          <g className={styles.primaryGroup} id="sour-primary">
            <WheelSector
              id="sour-fermented"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#ebb40d"
              d="M552.75 338.92a170.61 170.61 0 0 1-5.62 117.44L453.82 417a69.34 69.34 0 0 0 2.28-47.69Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(445.18 377.5) rotate(3.24)"
              >
                Sour/Fermented
              </text>
            </WheelSector>
            <WheelSector
              id="sour"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#e1c315"
              d="M665.7 303.48a289 289 0 0 1 11.24 120.57L559.38 410.1a170.66 170.66 0 0 0-6.63-71.18Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(546.3 357.82) rotate(-4.83)"
              >
                Sour
              </text>
            </WheelSector>
            <WheelSector
              id="sour-aromatics"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#9ea718"
              d="M685.78 297.17q3.26 10.41 5.79 21l-20.47 4.87q-2.36-9.88-5.4-19.59Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#9ea718"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.97, -0.26, 0.26, 0.97, 670.17, 292.18)"
              >
                Sour aromatics
              </text>
            </WheelSector>
            <WheelSector
              id="acetic-acid"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#94a770"
              d="M691.57 318.2q2.52 10.6 4.3 21.38L675.11 343q-1.67-10-4-19.94Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#94a770"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(674.93 313.75) rotate(-10.88)"
              >
                Acetic acid
              </text>
            </WheelSector>
            <WheelSector
              id="butyric-acid"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#d0b34f"
              d="M695.87 339.58q1.78 10.77 2.79 21.63l-20.95 2q-.94-10.12-2.6-20.16Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#655726"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.99, -0.12, 0.12, 0.99, 678.17, 335.6)"
              >
                Butyric acid
              </text>
            </WheelSector>
            <WheelSector
              id="isovaleric-acid"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#8eb646"
              d="M698.66 361.21q1 10.88 1.26 21.78l-21 .47q-.23-10.15-1.17-20.29Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#8eb646"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(679.86 357.62) rotate(-2.81)"
              >
                Isovaleric acid
              </text>
            </WheelSector>
            <WheelSector
              id="citric-acid"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#faef08"
              d="M699.92 383q.26 10.9-.27 21.81l-21-1q.5-10.16.26-20.33Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#7a7503"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(680 379.71) rotate(1.22)"
              >
                Citric acid
              </text>
            </WheelSector>
            <WheelSector
              id="malic-acid"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#c1ba09"
              d="M699.65 404.8q-.52 10.89-1.81 21.73l-20.9-2.48q1.2-10.1 1.68-20.26Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#5e5b04"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(678.58 401.76) rotate(5.25)"
              >
                Malic acid
              </text>
            </WheelSector>
            <WheelSector
              id="alcohol"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#b09733"
              d="M676.94 424.05a289.16 289.16 0 0 1-20.75 78.37l-109.06-46.06a170.14 170.14 0 0 0 12.25-46.26Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(539.68 420.69) rotate(15.33)"
              >
                Alcohol/Fermented
              </text>
            </WheelSector>
            <WheelSector
              id="winey"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#8f1b53"
              d="M697.84 426.53q-1.29 10.85-3.33 21.56l-20.67-3.95c1.27-6.65 2.3-13.36 3.1-20.09Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#8f1b53"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.99, 0.16, -0.16, 0.99, 675.62, 423.65)"
              >
                Winey
              </text>
            </WheelSector>
            <WheelSector
              id="whiskey"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#b34039"
              d="M694.51 448.09q-2 10.71-4.84 21.27L669.33 464q2.59-9.83 4.51-19.83Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#b34039"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(671.13 445.27) rotate(13.32)"
              >
                Whiskey
              </text>
            </WheelSector>
            <WheelSector
              id="fermented"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#ba9232"
              d="M689.67 469.36q-2.79 10.54-6.32 20.87l-19.92-6.8q3.3-9.63 5.9-19.46Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#ba9232"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(665.12 466.53) rotate(17.35)"
              >
                Fermented
              </text>
            </WheelSector>
            <WheelSector
              id="overripe"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#8b6439"
              d="M683.35 490.23q-3.52 10.32-7.77 20.38l-19.39-8.19q4-9.36 7.24-19Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#8b6439"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(657.64 487.31) rotate(21.38)"
              >
                Overripe
              </text>
            </WheelSector>
            <g></g>
          </g>
          <g className={styles.primaryGroup} id="green-primary">
            <WheelSector
              id="green"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#197a2f"
              d="M547.13 456.36a170.52 170.52 0 0 1-91.95 91.27L416.47 454a69.3 69.3 0 0 0 37.35-37Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(419.8 429.05) rotate(45.72)"
              >
                Green/
                <tspan x="36.69" y="0" letter-spacing="-.06em">
                  V
                </tspan>
                <tspan x="44.03" y="0">
                  egetative
                </tspan>
              </text>
            </WheelSector>
            <WheelSector
              id="olive-oil"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#a2b028"
              d="M656.19 502.42q-5.37 12.72-11.94 24.87L540.09 471q3.87-7.16 7-14.68Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(527.22 452.31) rotate(26.13)"
              >
                Olive oil
              </text>
            </WheelSector>
            <WheelSector
              id="raw"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#708933"
              d="M644.25 527.29q-6.56 12.15-14.25 23.62L531.68 485q4.53-6.76 8.41-13.95Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.85, 0.52, -0.52, 0.85, 518.7, 467.3)"
              >
                Raw
              </text>
            </WheelSector>
            <WheelSector
              id="green-veg"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#3aa255"
              d="M630 550.91a288.88 288.88 0 0 1-104.63 94.37L469.91 540.7a170.65 170.65 0 0 0 61.77-55.7Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.66, 0.75, -0.75, 0.66, 484.13, 507.36)"
              >
                Green/
                <tspan x="36.69" y="0" letter-spacing="-.06em">
                  V
                </tspan>
                <tspan x="44.03" y="0">
                  egetative
                </tspan>
              </text>
            </WheelSector>
            <WheelSector
              id="under-ripe"
              fill="#a2bc2b"
              d="M647.48 562.63q-6.08 9.06-12.77 17.68l-16.61-12.92q6.24-8 11.9-16.48Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#4f5c15"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.81, 0.59, -0.59, 0.81, 617.58, 558.67)"
              >
                Under-ripe
              </text>
            </WheelSector>
            <WheelSector
              id="peapod"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#62aa3c"
              d="M634.71 580.31q-6.71 8.61-14 16.73l-15.66-14q6.8-7.57 13-15.6Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#62aa3c"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.76, 0.65, -0.65, 0.76, 603.74, 575.88)"
              >
                Peapod
              </text>
            </WheelSector>
            <WheelSector
              id="fresh"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#03a653"
              d="M620.72 597q-7.29 8.13-15.13 15.71L591 597.63q7.31-7.07 14.1-14.64Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#03a653"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(588.72 592.08) rotate(44.42)"
              >
                Fresh
              </text>
            </WheelSector>
            <WheelSector
              id="dark-green"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#048549"
              d="M605.59 612.75q-7.83 7.59-16.19 14.61l-13.54-16.11q7.78-6.54 15.1-13.62Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#048549"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.66, 0.75, -0.75, 0.66, 572.6, 607.18)"
              >
                Dark green
              </text>
            </WheelSector>
            <WheelSector
              id="vegetative"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#27b44b"
              d="M589.4 627.36q-8.35 7-17.19 13.44l-12.37-17q8.24-6 16-12.52Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#27b44b"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.61, 0.79, -0.79, 0.61, 555.45, 621.11)"
              >
                <tspan letter-spacing="-.06em">V</tspan>
                <tspan x="7.34" y="0">
                  egetative
                </tspan>
              </text>
            </WheelSector>
            <WheelSector
              id="hay-like"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#a3a830"
              d="M572.21 640.8q-8.82 6.41-18.08 12.19L543 635.13q8.63-5.39 16.85-11.36Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#a3a830"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(537.37 633.8) rotate(56.52)"
              >
                Hay-like
              </text>
            </WheelSector>
            <WheelSector
              id="herb-like"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#7ac141"
              d="M554.13 653q-9.25 5.78-18.9 10.89l-9.86-18.6q9-4.75 17.62-10.15Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#7ac141"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.49, 0.87, -0.87, 0.49, 518.44, 645.19)"
              >
                Herb-like
              </text>
            </WheelSector>
            <WheelSector
              id="beany"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#5e9a80"
              d="M525.37 645.28q-12.2 6.47-25 11.75l-45.23-109.4q7.53-3.12 14.73-6.93Z"
              transform="translate(-23.83 -19.37)"
            >
              {" "}
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(439.44 535.68) rotate(65.3)"
              >
                Beany
              </text>
            </WheelSector>
            <g></g>
          </g>
          <g className={styles.primaryGroup} id="other-primary">
            <WheelSector
              id="other"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#0aa3b5"
              d="M455.18 547.63a170.56 170.56 0 0 1-179.42-31l67.84-75.22A69.29 69.29 0 0 0 416.47 454Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.16, -0.99, 0.99, 0.16, 350.89, 478.87)"
              >
                Other
              </text>
            </WheelSector>
            <WheelSector
              id="papery-musty"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#9db2b7"
              d="M500.41 657a289 289 0 0 1-199 8l36.3-112.68a170.61 170.61 0 0 0 117.48-4.73Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(369.45 551.19) rotate(88.2)"
              >
                Papery/Musty
              </text>
            </WheelSector>
            <WheelSector
              id="stale"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#8b8c90"
              d="M508.45 676.48q-10.08 4.17-20.43 7.62l-6.66-20q9.64-3.21 19.05-7.1Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#8b8c90"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(471.02 666.56) rotate(70.05)"
              >
                Stale
              </text>
            </WheelSector>
            <WheelSector
              id="cardboard"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#bdb175"
              d="M488 684.1q-10.35 3.45-20.93 6.16l-5.23-20.38q9.86-2.53 19.5-5.75Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#5c5639"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(449.95 673.2) rotate(74.08)"
              >
                Cardboard
              </text>
            </WheelSector>
            <WheelSector
              id="papery"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#fefef4"
              d="M467.09 690.26q-10.56 2.72-21.3 4.68l-3.79-20.7q10-1.83 19.86-4.36Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#7c7c77"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.21, 0.98, -0.98, 0.21, 428.47, 678.35)"
              >
                Papery
              </text>
            </WheelSector>
            <WheelSector
              id="woody"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#744f02"
              d="M445.79 694.94q-10.73 2-21.58 3.17l-2.32-20.92q10.11-1.12 20.11-3Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#744f02"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(406.68 681.97) rotate(82.15)"
              >
                <tspan letter-spacing="-.02em">W</tspan>
                <tspan x="11.11" y="0">
                  oody
                </tspan>
              </text>
            </WheelSector>
            <WheelSector
              id="moldy-damp"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#a3a36f"
              d="M424.21 698.11q-10.84 1.2-21.75 1.64l-.84-21q10.15-.4 20.27-1.53Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#a3a36f"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(384.69 684.04) rotate(86.18)"
              >
                Moldy/Damp
              </text>
            </WheelSector>
            <WheelSector
              id="musty-dusty"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#c9b583"
              d="M402.46 699.75q-10.89.43-21.81.11l.64-21q10.15.31 20.33-.1Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#625840"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(362.6 684.57) rotate(90.21)"
              >
                Musty/Dusty
              </text>
            </WheelSector>
            <WheelSector
              id="musty-earthy"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#988847"
              d="M380.65 699.86q-10.9-.33-21.76-1.43L361 677.5q10.11 1 20.29 1.32Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#988847"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(346.83 754.12) rotate(-86.76)"
              >
                Musty/Earthy
              </text>
            </WheelSector>
            <WheelSector
              id="animalic"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#9d977f"
              d="M358.89 698.43q-10.86-1.09-21.61-2.95l3.58-20.74q10 1.74 20.14 2.76Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#9d977f"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(323.04 727.34) rotate(-82.72)"
              >
                Animalic
              </text>
            </WheelSector>
            <WheelSector
              id="meaty-brothy"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#cc7b6a"
              d="M337.28 695.48q-10.75-1.85-21.35-4.46l5-20.44q9.87 2.43 19.9 4.16Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#cc7b6a"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.2, -0.98, 0.98, 0.2, 293.1, 748.28)"
              >
                Meaty/Brothy
              </text>
            </WheelSector>
            <WheelSector
              id="phenolic"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#db646a"
              d="M315.93 691q-10.59-2.61-21-5.95l6.45-20q9.68 3.11 19.56 5.54Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#db646a"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(273.25 718.42) rotate(-74.66)"
              >
                Phenolic
              </text>
            </WheelSector>
            <WheelSector
              id="chemical"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#76c0cb"
              d="M301.4 665a289 289 0 0 1-104.93-60.47l79.29-87.91a170.53 170.53 0 0 0 61.94 35.7Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(254.88 572.6) rotate(-60.55)"
              >
                Chemical
              </text>
            </WheelSector>
            <WheelSector
              id="bitter"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#80a89d"
              d="M295 685.07q-10.4-3.35-20.52-7.42l7.85-19.53q9.44 3.79 19.12 6.92Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#80a89d"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(255 694.03) rotate(-70.63)"
              >
                Bitter
              </text>
            </WheelSector>
            <WheelSector
              id="salty"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#def2fd"
              d="M274.43 677.65q-10.11-4.06-19.94-8.83l9.2-18.93q9.15 4.44 18.59 8.23Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#6c767b"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(233.06 684.19) rotate(-66.6)"
              >
                Salty
              </text>
            </WheelSector>
            <WheelSector
              id="medicinal"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#7a9bae"
              d="M254.49 668.82q-9.81-4.77-19.27-10.22l10.51-18.24q8.82 5.08 18 9.53Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#7a9bae"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(200.28 695.36) rotate(-62.56)"
              >
                Medicinal
              </text>
            </WheelSector>
            <WheelSector
              id="petroleum"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#039fb8"
              d="M235.22 658.6q-9.45-5.45-18.5-11.55l11.77-17.45q8.43 5.68 17.24 10.76Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#039fb8"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(175.77 686.31) rotate(-58.53)"
              >
                Petroleum
              </text>
            </WheelSector>
            <WheelSector
              id="skunky"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#5e777b"
              d="M216.72 647.05q-9-6.09-17.64-12.82l13-16.58q8 6.26 16.45 12Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#5e777b"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(162.95 659.65) rotate(-54.5)"
              >
                Skunky
              </text>
            </WheelSector>
            <WheelSector
              id="rubber"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#120c0c"
              d="M199.08 634.23q-8.6-6.72-16.7-14l14.09-15.63q7.53 6.78 15.53 13.05Z"
              transform="translate(-23.83 -19.37)"
            >
              {" "}
              <text
                fill="#120c0c"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(143.13 644.65) rotate(-50.47)"
              >
                Rubber
              </text>
            </WheelSector>
            <g></g>
          </g>
          <g className={styles.primaryGroup} id="roasted-primary">
            <WheelSector
              id="roasted"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#c94930"
              d="M275.76 516.66a170.49 170.49 0 0 1-52.08-88.82l98.77-22.47a69.3 69.3 0 0 0 21.15 36.07Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(261.01 436.32) rotate(-30.88)"
              >
                Roasted
              </text>
            </WheelSector>
            <WheelSector
              id="pipe-tobacco"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#caa465"
              d="M196.47 604.57q-10.25-9.24-19.58-19.43l87.31-79.95q5.51 6 11.56 11.47Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(193.36 551.24) rotate(-45.72)"
              >
                Pipe tobacco
              </text>
            </WheelSector>
            <WheelSector
              id="tobacco"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#dfbd7e"
              d="M176.89 585.14q-9.31-10.18-17.63-21.21l94.53-71.26q4.91 6.51 10.41 12.52Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.76, -0.65, 0.65, 0.76, 195.77, 517.99)"
              >
                <tspan letter-spacing="-.11em">T</tspan>
                <tspan x="6" y="0">
                  obacco
                </tspan>
              </text>
            </WheelSector>
            <WheelSector
              id="burnt"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#be8663"
              d="M159.26 563.93A289 289 0 0 1 120 493l110.61-42.2a170.39 170.39 0 0 0 23.16 41.88Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.87, -0.49, 0.49, 0.87, 185.12, 475.58)"
              >
                Burnt
              </text>
            </WheelSector>
            <WheelSector
              id="acrid"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#b9a449"
              d="M142.45 576.6q-6.57-8.72-12.51-17.87l17.66-11.46q5.53 8.54 11.66 16.66Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#b9a449"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(89.68 570.73) rotate(-35.49)"
              >
                Acrid
              </text>
            </WheelSector>
            <WheelSector
              id="ashy"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#899893"
              d="M129.94 558.73Q124 549.58 118.72 540l18.42-10.19q4.92 8.89 10.46 17.43Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#899893"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.85, -0.52, 0.52, 0.85, 76.86, 550.45)"
              >
                Ashy
              </text>
            </WheelSector>
            <WheelSector
              id="smoky"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#a1743b"
              d="M118.72 540q-5.28-9.56-9.88-19.45l19.09-8.87q4.29 9.23 9.21 18.13Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#a1743b"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(56.06 534.27) rotate(-27.43)"
              >
                Smoky
              </text>
            </WheelSector>
            <WheelSector
              id="brown-roast"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#894810"
              d="M108.84 520.58q-4.59-9.9-8.48-20.09L120 493q3.63 9.5 7.91 18.72Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#894810"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.92, -0.4, 0.4, 0.92, 12.87, 526.1)"
              >
                Brown, Roast
              </text>
            </WheelSector>
            <WheelSector
              id="cereal"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#ddaf61"
              d="M120 493a289.84 289.84 0 0 1-11.78-38.89l115.44-26.26a170.37 170.37 0 0 0 6.95 23Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(160.78 437.3) rotate(-17.35)"
              >
                Cereal
              </text>
            </WheelSector>
            <WheelSector
              id="grain"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#b7906f"
              d="M100.36 500.49q-3.89-10.2-7-20.64l20.14-6.1q2.94 9.74 6.57 19.24Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#b7906f"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(43.08 486.72) rotate(-19.36)"
              >
                Grain
              </text>
            </WheelSector>
            <WheelSector
              id="malt"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#eb9d5e"
              d="M93.31 479.85q-3.16-10.44-5.59-21.09l20.52-4.66q2.27 9.91 5.21 19.65Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#734c2e"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(42.16 461.95) rotate(-15.33)"
              >
                Malt
              </text>
            </WheelSector>
            <g></g>
          </g>
          <g className={styles.primaryGroup} id="spices-primary">
            <WheelSector
              id="spices"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#ad213e"
              d="M223.68 427.84a170.49 170.49 0 0 1 1-79.84l98.18 24.94a69.3 69.3 0 0 0-.41 32.43Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(250.86 372.58) rotate(0.22)"
              >
                Spices
              </text>
            </WheelSector>
            <WheelSector
              id="pungent"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#794652"
              d="M108.24 454.1q-3.06-13.47-4.82-27.16l117.41-15.14q1 8.08 2.85 16Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.98, -0.18, 0.18, 0.98, 145.16, 414.35)"
              >
                Pungent
              </text>
            </WheelSector>
            <WheelSector
              id="pepper"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#cc3c42"
              d="M103.42 426.94q-1.77-13.69-2.22-27.5l118.32-3.87c.18 5.43.61 10.85 1.31 16.23Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(147.98 392.54) rotate(-5.11)"
              >
                Pepper
              </text>
            </WheelSector>
            <WheelSector
              id="brown-spice"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#b14d57"
              d="M101.2 399.44a289.17 289.17 0 0 1 8.74-80.6L224.68 348a170.19 170.19 0 0 0-5.16 47.57Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(1, 0.1, -0.1, 1, 121.21, 348.62)"
              >
                Brown spice
              </text>
            </WheelSector>
            <WheelSector
              id="anise"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#c78935"
              d="M80.17 400.13q-.36-10.9 0-21.81l21 .79q-.37 10.15 0 20.33Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#c78935"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(22.21 375.16) rotate(-0.36)"
              >
                Anise
              </text>
            </WheelSector>
            <WheelSector
              id="nutmeg"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#8c292c"
              d="M80.22 378.32q.41-10.9 1.59-21.76l20.92 2.27q-1.1 10.11-1.48 20.28Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#8c292c"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(10.77 350.2) rotate(3.68)"
              >
                Nutmeg
              </text>
            </WheelSector>
            <WheelSector
              id="cinnamon"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#e5762e"
              d="M81.81 356.56Q83 345.72 84.92 335l20.71 3.73q-1.8 10-2.9 20.12Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#e5762e"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(0.52 323.56) rotate(7.71)"
              >
                Cinnamon
              </text>
            </WheelSector>
            <WheelSector
              id="clove"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#a16c5a"
              d="M84.92 335q1.93-10.74 4.63-21.32l20.39 5.18q-2.5 9.86-4.31 19.87Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#a16c5a"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(28.25 302.85) rotate(11.74)"
              >
                Clove
              </text>
            </WheelSector>
            <g></g>
          </g>
          <g className={styles.primaryGroup} id="nutty-primary">
            <WheelSector
              id="nutty-cocoa"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#a87b64"
              d="M224.68 348a170.79 170.79 0 0 1 24.6-54.41l83.57 57.26a69.47 69.47 0 0 0-10 22.09Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.91, 0.4, -0.4, 0.91, 232.29, 314.1)"
              >
                Nutty/Cocoa
              </text>
            </WheelSector>
            <WheelSector
              id="nutty"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#c78869"
              d="M109.94 318.84a289.88 289.88 0 0 1 21.13-57.1l106.08 52.55A170.58 170.58 0 0 0 224.68 348Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(169.11 302.22) rotate(19.8)"
              >
                Nutty
              </text>
            </WheelSector>
            <WheelSector
              id="peanuts"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#d4ad13"
              d="M89.55 313.66q2.69-10.57 6.11-20.94l20 6.61q-3.19 9.65-5.7 19.51Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#675409"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(21 275.63) rotate(15.77)"
              >
                Peanuts
              </text>
            </WheelSector>
            <WheelSector
              id="hazelnut"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#9d5433"
              d="M95.66 292.72q3.42-10.35 7.57-20.45l19.47 8q-3.87 9.4-7.06 19.07Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#9d5433"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(25.41 250.47) rotate(19.8)"
              >
                Hazelnut
              </text>
            </WheelSector>
            <WheelSector
              id="almond"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#c89f83"
              d="M103.23 272.27q4.14-10.09 9-19.87l18.86 9.34q-4.51 9.11-8.37 18.52Z"
              transform="translate(-23.83 -19.37)"
            >
              {" "}
              <text
                fill="#614d40"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.91, 0.4, -0.4, 0.91, 40.8, 229.5)"
              >
                Almond
              </text>
            </WheelSector>
            <WheelSector
              id="cocoa"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#bb764c"
              d="M131.07 261.74a288.81 288.81 0 0 1 20.56-35.06l97.65 66.91a172.07 172.07 0 0 0-12.13 20.7Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(178.33 265.46) rotate(29.88)"
              >
                Cocoa
              </text>
            </WheelSector>
            <WheelSector
              id="chocolate"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#692a19"
              d="M112.21 252.4q4.85-9.78 10.37-19.2l18.15 10.65q-5.14 8.78-9.66 17.89Z"
              transform="translate(-23.83 -19.37)"
            >
              {" "}
              <text
                fill="#692a19"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.88, 0.47, -0.47, 0.88, 39.73, 200.74)"
              >
                Chocolate
              </text>
            </WheelSector>
            <WheelSector
              id="dark-chocolate"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#470603"
              d="M122.58 233.2q5.52-9.4 11.68-18.41l17.37 11.89q-5.76 8.4-10.9 17.17Z"
              transform="translate(-23.83 -19.37)"
            >
              {" "}
              <text
                fill="#470603"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.85, 0.53, -0.53, 0.85, 30.41, 164.46)"
              >
                Dark chocolate
              </text>
            </WheelSector>
            <g></g>
          </g>
          <g className={styles.primaryGroup} id="sweet-primary">
            <WheelSector
              id="sweet"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#e65832"
              d="M249.28 293.59a170.65 170.65 0 0 1 89.23-66.21L369.09 324a69.23 69.23 0 0 0-36.24 26.89Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.6, 0.8, -0.8, 0.6, 296.35, 282.22)"
              >
                Sweet
              </text>
            </WheelSector>
            <WheelSector
              id="brown-sugar"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#d45a59"
              d="M151.63 226.68a289 289 0 0 1 54.74-59.79l75.23 91.41a171.22 171.22 0 0 0-32.32 35.29Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.74, 0.67, -0.67, 0.74, 180.25, 206.57)"
              >
                Brown sugar
              </text>
            </WheelSector>
            <WheelSector
              id="molasses"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#310c0f"
              d="M134.26 214.79q6.17-9 13-17.55l16.48 13.09q-6.33 8-12.07 16.35Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#310c0f"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(69.5 158.59) rotate(35.93)"
              >
                Molasses
              </text>
            </WheelSector>
            <WheelSector
              id="mapple-syrup"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#ae341f"
              d="M147.22 197.24q6.78-8.53 14.15-16.59l15.52 14.21q-6.87 7.5-13.19 15.47Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#ae341f"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.77, 0.64, -0.64, 0.77, 68.78, 124.54)"
              >
                Mapple syrup
              </text>
            </WheelSector>
            <WheelSector
              id="caramelized"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#d78823"
              d="M161.37 180.65q7.37-8.06 15.29-15.56l14.48 15.27q-7.38 7-14.25 14.5Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#d78823"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.72, 0.69, -0.69, 0.72, 90.19, 107.49)"
              >
                Caramelized
              </text>
            </WheelSector>
            <WheelSector
              id="honey"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#da5c1f"
              d="M176.66 165.09q7.91-7.51 16.34-14.44l13.37 16.24q-7.85 6.47-15.23 13.47Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#da5c1f"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.67, 0.74, -0.74, 0.67, 131.22, 113.03)"
              >
                Honey
              </text>
            </WheelSector>
            <WheelSector
              id="vanilla"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#f89a80"
              d="M206.37 166.89q10.66-8.76 22.12-16.49l66.17 98.16q-6.77 4.56-13.06 9.74Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.6, 0.8, -0.8, 0.6, 233.78, 200.31)"
              >
                Vanilla
              </text>
            </WheelSector>
            <WheelSector
              id="vanillin"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#f37674"
              d="M228.49 150.4q11.43-7.71 23.58-14.31l56.51 104q-7.15 3.9-13.92 8.45Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(249.22 186.19) rotate(58.25)"
              >
                <tspan letter-spacing="-.07em">V</tspan>
                <tspan x="7.11" y="0">
                  anillin
                </tspan>
              </text>
            </WheelSector>
            <WheelSector
              id="overall-sweet"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#e75b68"
              d="M252.07 136.09q12.12-6.59 24.84-12L323.24 233q-7.5 3.19-14.66 7.08Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(251.89 144.59) rotate(63.72)"
              >
                Overall sweet
              </text>
            </WheelSector>
            <WheelSector
              id="sweet-aromatics"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#d0545f"
              d="M276.91 124.1q12.7-5.41 25.87-9.58l35.73 112.86q-7.75 2.46-15.27 5.65Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(268.05 119.14) rotate(69.2)"
              >
                Sweet
                <tspan x="33.35" y="0" letter-spacing="-.06em">
                  {" "}
                </tspan>
                <tspan x="36.02" y="0">
                  Aromatics
                </tspan>
              </text>
            </WheelSector>
            <g></g>
          </g>
          <g className={styles.primaryGroup} id="floral-primary">
            <WheelSector
              id="floral"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#da0d68"
              d="M338.51 227.38a170.7 170.7 0 0 1 51.49-7.95v101.3a69.32 69.32 0 0 0-20.91 3.27Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(346.17 263.17) rotate(80.72)"
              >
                Floral
              </text>
            </WheelSector>
            <WheelSector
              id="black-tea"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#975e6d"
              d="M302.78 114.52q13.16-4.15 26.67-7.06l24.81 115.75q-8 1.71-15.75 4.17Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(302.41 147.15) rotate(74.67)"
              >
                Black
                <tspan x="29.34" y="0" letter-spacing="-.02em">
                  {" "}
                </tspan>
                <tspan x="32.46" y="0" letter-spacing="-.11em">
                  T
                </tspan>
                <tspan x="38.46" y="0">
                  ea
                </tspan>
              </text>
            </WheelSector>
            <WheelSector
              id="floral-secondary"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#e0719c"
              d="M329.45 107.46a289.29 289.29 0 0 1 60.55-6.41v118.38a171 171 0 0 0-35.74 3.78Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#fff"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.11, 0.99, -0.99, 0.11, 339.77, 161.7)"
              >
                Floral
              </text>
            </WheelSector>
            <WheelSector
              id="chamomile"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#f99e1b"
              d="M325 86.88q10.66-2.28 21.47-3.81l3 20.83q-10.08 1.42-20 3.56Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#7a4d0d"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(295.02 2.8) rotate(79.42)"
              >
                Chamomile
              </text>
            </WheelSector>
            <WheelSector
              id="rose"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#ef5a78"
              d="M346.51 83.07q10.8-1.53 21.69-2.3l1.48 21q-10.14.72-20.21 2.14Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#ef5a78"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="matrix(0.11, 0.99, -0.99, 0.11, 324.78, 31.16)"
              >
                Rose
              </text>
            </WheelSector>
            <WheelSector
              id="jasmine"
              onClick={handlePathClick}
              breadcrumbIds={breadcrumbIds}
              fill="#f7f1bd"
              d="M368.2 80.77Q379.09 80 390 80v21q-10.17 0-20.32.71Z"
              transform="translate(-23.83 -19.37)"
            >
              <text
                fill="#79765c"
                font-family="ArialMT, Arial"
                font-size="12"
                style={{ isolation: "isolate" }}
                transform="translate(348.02 12.44) rotate(87.48)"
              >
                Jasmine
              </text>
            </WheelSector>
            <g></g>
          </g>
        </svg>
      </SelectionsContext.Provider>
    </>
  );
};

export default Wheel;
