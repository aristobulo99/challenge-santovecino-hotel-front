export interface Actions {
    title: string;
    type: 'flat' | 'outline';
    size: 'large' | 'medium' | 'small';
}

export interface DataSource{
    [key: string]: string | number | Date | boolean | Actions[];
}