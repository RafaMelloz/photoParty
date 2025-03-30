import { create } from 'zustand'

interface StoreState {
    newColletion: boolean;
    switchStatusCollection: (status:boolean) => void;
}


const useStore = create<StoreState>((set) => ({
    newColletion: true,
    switchStatusCollection: (status) => set(() => ({ newColletion: status })),
}))

export default useStore;