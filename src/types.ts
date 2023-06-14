export type Coffee = {
    name: string;
    origin: string;
    process: string;
    varietal: string;
}

export type TastingHistoryEntry = {
    coffee: Coffee;
    details: {
        comments?: string | never;
        date?: string;
        selections?: string[];
    }
}