export type Ingredient = {
    name: string
    excludeFromNutrition?: true
    nutritionId?: string
    servings?: number
    link?: string
}

export type Component = {
    name: string
    excludeFromNutrition: true
    servings?: number
}

export type ComponentContent = {
    metadata: ComponentMetadata
    content: string
    slug: string
}

export type ComponentMetadata = {
    excerpt: string
    title: string
    ingredients: (string | Ingredient)[]
    directions: string[]
    brandedFoods?: boolean
}

export type RecipeMetadata = {
    excerpt: string
    title: string
    category: string
    tags: string[]
    rating: number
    servings: number
    components?: (string | Component)[]
    ingredients: (string | Ingredient)[]
    directions: string[]
    componentContent: ComponentContent[]
    brandedFoods?: boolean
}

export type Recipe = {
    metadata: RecipeMetadata
    content: string
    slug: string
}