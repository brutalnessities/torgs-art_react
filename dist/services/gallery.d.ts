export declare function GET_ITEMS(): Promise<{
    title: any;
    order: any;
    year: any;
    medium: any;
    height: any;
    width: any;
    metric: any;
    location: any;
    item_images: {
        photo_url: any;
        description: any;
    }[];
}[]>;
export declare function createItem(data: any): Promise<void | {
    res: any;
    error: null;
}>;
export declare function deleteItem(id: number): Promise<import("@supabase/postgrest-js").PostgrestSingleResponse<null>>;
export declare function updateItem(id: number, title: string): Promise<import("@supabase/postgrest-js").PostgrestSingleResponse<null>>;
//# sourceMappingURL=gallery.d.ts.map