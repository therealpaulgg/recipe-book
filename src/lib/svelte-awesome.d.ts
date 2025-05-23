declare module 'svelte-awesome/components/Icon.svelte' {
    import { SvelteComponentTyped } from 'svelte';
    
    export interface IconProps {
        data?: any;
        scale?: number;
        spin?: boolean;
        inverse?: boolean;
        pulse?: boolean;
        flip?: 'horizontal' | 'vertical';
        label?: string;
        self?: any;
    }
    
    export default class Icon extends SvelteComponentTyped<IconProps> {}
}