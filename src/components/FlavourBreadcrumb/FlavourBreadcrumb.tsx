import { computeSelectionBreadcrumb } from "../Wheel/utils";
import { BreadcrumbSection } from "./BreadcrumbSection";

type FlavourBreadcrumbProps = {
  selections: string[];
};

const FlavourBreadcrumb = ({ selections }: FlavourBreadcrumbProps) => {
  return (
    <ol className="flex gap-4 items-center flex-wrap">
      {selections.map((selection, idx) => {
        const flavourBreadcrumb = computeSelectionBreadcrumb(selection);
        return (
          <BreadcrumbSection
            key={selection}
            flavour={flavourBreadcrumb.breadcrumb.slice(-1)[0]}
            isLast={idx === selections.length - 1}
          />
        );
      })}
    </ol>
  );
};

export default FlavourBreadcrumb;
