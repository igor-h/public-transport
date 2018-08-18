export interface Station {
    id?: number;
    name: string;
    score?: any;
    distance?: number;
    coordinate?: Coordinate;
}

export interface Coordinate {
    type: string;
    x?:number;
    y?:number;
}
