interface Food {
    food_name: string;
    brand_name: string | null;
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: number;
    nf_calories: number;
    nf_total_fat: number;
    nf_saturated_fat: number;
    nf_cholesterol: number;
    nf_sodium: number;
    nf_total_carbohydrate: number;
    nf_dietary_fiber: number;
    nf_sugars: number;
    nf_protein: number;
    nf_potassium: number;
    nf_p: number;
    full_nutrients: {
        attr_id: number;
        value: number;
    }[];
    nix_brand_name: string | null;
    nix_brand_id: string | null;
    nix_item_name: string | null;
    nix_item_id: string | null;
    upc: string | null;
    consumed_at: string;
    metadata: Record<string, unknown>;
    source: number;
    ndb_no: number;
    tags: {
        item: string;
        measure: string;
        quantity: string;
        tag_id: number;
    };
    alt_measures: {
        serving_weight: number;
        measure: string;
        seq: number;
        qty: number;
    }[];
    lat: number | null;
    lng: number | null;
    meal_type: number;
    photo: {
        thumb: string;
        highres: string;
    };
}

interface SimplifiedFood {
    name: string;
    brand: string | null;
    servingSize: number;
    servingUnit: string;
    servingWeightGrams: number;
    calories: number;
    fat: number;
    saturatedFat: number;
    cholesterol: number;
    sodium: number;
    carbs: number;
    fiber: number;
    sugars: number;
    protein: number;
    potassium: number;
}