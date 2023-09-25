import {create} from 'zustand';

type InfoModalState = {
    movieId: string;
    isOpen: boolean;
    open: (movieId: string) => void;
    close: () => void;
}

const useInfoModal = create<InfoModalState>((set) => ({
    movieId: '',
    isOpen: false,
    open: (movieId: string) => set({movieId, isOpen: true}),
    close: () => set({movieId: '', isOpen: false}),
}));

export default useInfoModal;