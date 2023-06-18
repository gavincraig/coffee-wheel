import { FlavourBreadcrumbEntry } from '../../types';
import wheelData from './wheel-data.json';

export const computeSelectionBreadcrumb = (id: string): {breadcrumb: FlavourBreadcrumbEntry[], currentItem: FlavourBreadcrumbEntry} => {
    const breadcrumb: FlavourBreadcrumbEntry[] = [];

    const checkItemsForIdRecursive = (items: FlavourBreadcrumbEntry[], id: string, breadcrumb?: FlavourBreadcrumbEntry[]) => {
      let idx = 0;

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