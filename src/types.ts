export type Coffee = {
    name: string;
    origin: string;
    process: string;
    varietal: string;
}

export type Flavour = {
    id: string;
    displayName: string;
    color: string;
}

export type FlavourBreadcrumbEntry = {
    id: string;
    displayName: string;
    color: string;
    children?: FlavourBreadcrumbEntry[] | never;
}

export type TastingHistoryEntry = {
    coffee: Coffee;
    details: {
        comments?: string | never;
        date?: Date;
        selections?: string[];
    }
}