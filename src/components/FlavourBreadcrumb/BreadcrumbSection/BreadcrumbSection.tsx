import { Flavour } from "../../../types";

type BreadcrumbSectionProps = {
  flavour: Flavour;
  isLast?: boolean;
};

const BreadcrumbSection = ({ flavour, isLast }: BreadcrumbSectionProps) => {
  return (
    <li
      style={{ color: flavour.color, width: "fit-content" }}
      className="font-bagel text-2xl sm:text-4xl cursor-pointer hover:opacity-50"
    >
      {flavour.displayName}
      {!isLast && ","}
    </li>
  );
};

export default BreadcrumbSection;
