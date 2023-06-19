import { Flavour } from "../../types";
import { computeSelectionBreadcrumb } from "../Wheel/utils";

type FlavourBreadcrumbSection = {
    flavour: Flavour;
    isLast?: boolean
}

const FlavourBreadcrumbSection = ({ flavour, isLast }) => {
    return (
      <li style={{ color: flavour.color, width: 'fit-content' }} className='font-bagel text-4xl cursor-pointer hover:opacity-50'>
        {flavour.displayName}
        {!isLast && ','}
        </li>
    );
  };

type FlavourBreadcrumbProps = {
    selections: string[];
}

const FlavourBreadcrumb = ({ selections } : FlavourBreadcrumbProps) => {
    return(
      <ol className='flex gap-4 items-center flex-wrap'>
        {
          selections.map((selection, idx) => {
            const flavourBreadcrumb = computeSelectionBreadcrumb(selection);
            return <FlavourBreadcrumbSection key={selection} flavour={flavourBreadcrumb.breadcrumb.slice(-1)[0]} isLast={idx === selections.length - 1} />
          })
        }
      </ol>
    )
  }

  export default FlavourBreadcrumb;