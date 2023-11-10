export type Ingredient = {
    name: string
    excludeFromNutrition: true
}

export type Component = {
    name: string
    excludeFromNutrition: true
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
}

export type Recipe = {
    metadata: RecipeMetadata
    content: string
}