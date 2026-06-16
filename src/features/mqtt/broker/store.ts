import { create } from "zustand";
import { BrokerParameters, CreateBroker } from "./models/BrokerParameters";
import { CreatBroker, GetBrokers } from "./api";

interface BrokerStore {
  brokers: BrokerParameters[];
  editBroker: BrokerParameters;
  createBroker: CreateBroker;

  initialized: boolean;
  init: () => void;

  isCreate: boolean;
  openCreate: () => void;
  closeCreate: () => void;
  setCreateBroker: <T extends keyof CreateBroker>(
    key: T,
    value: CreateBroker[T],
  ) => void;
  handleCreateBroker: () => Promise<void>;

  isEdit: boolean;
  openEdit: (id: number) => void;
  closeEdit: () => void;
  updateBroker: <T extends keyof BrokerParameters>(
    key: T,
    value: BrokerParameters[T],
  ) => void;
  handleEditBroker: () => Promise<void>;
}

export const useBrokerStore = create<BrokerStore>((set, get) => ({
  brokers: [],
  editBroker: {} as BrokerParameters,
  createBroker: { host: "", port: 1883 },

  initialized: false,
  init: async () => {
    set({ brokers: await GetBrokers() });
  },

  isCreate: false,
  openCreate: () => {
    set({ isCreate: true });
  },
  closeCreate: () => {
    set({ isCreate: false, createBroker: { host: "", port: 1883 } });
  },
  setCreateBroker: <T extends keyof CreateBroker>(
    key: T,
    value: CreateBroker[T],
  ) => {
    set({ createBroker: { ...get().createBroker, [key]: value } });
  },
  handleCreateBroker: async () => {
    await CreatBroker(get().createBroker);
    get().init();
  },

  isEdit: false,
  openEdit: (id: number) => {
    set({ isEdit: true, editBroker: get().brokers.find((b) => b.id === id) });
  },
  closeEdit: () => {
    set({ isEdit: false, editBroker: {} as BrokerParameters });
  },
  updateBroker: <T extends keyof BrokerParameters>(
    key: T,
    value: BrokerParameters[T],
  ) => {
    set({ editBroker: { ...get().editBroker, [key]: value } });
  },
  handleEditBroker: async () => {},
}));
