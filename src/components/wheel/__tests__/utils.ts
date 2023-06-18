import { expect, describe, it } from 'vitest';
import { computeSelectionBreadcrumb } from '../utils';


describe('computeSelectionBreadcrumb', () => {
        it('returns correct breadcrumb and current item for simple case', () => {
            const { breadcrumb, currentItem } = computeSelectionBreadcrumb('fruity');
            expect(breadcrumb.length).toBe(1);
            expect(breadcrumb[0].displayName).toBe('Fruity');
            expect(breadcrumb[0].id).toBe('fruity');
            expect(currentItem.displayName).toBe('Fruity')
            expect(breadcrumb[0].id).toBe('fruity');
    })

    it('returns correct breadcrumb and current item for nested case', () => {
        const { breadcrumb, currentItem } = computeSelectionBreadcrumb('honey');
        expect(breadcrumb.length).toBe(3);
        expect(breadcrumb[0].id).toBe('sweet');
        expect(breadcrumb[1].id).toBe('brown-sugar');
        expect(breadcrumb[2].id).toBe('honey');
        expect(currentItem.displayName).toBe('Honey');
        expect(currentItem.id).toBe('honey')
    })
})


