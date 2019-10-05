
export interface ITripItem {
    id: number,
    name: string,
    notes: string,
    address: string,
    cost: number,
    localCost: number | null,
    tripId: number,
}
