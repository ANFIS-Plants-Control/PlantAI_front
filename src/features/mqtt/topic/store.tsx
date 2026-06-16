import { create } from "zustand";
import { TopicDefinition } from "./models/TopicDefinition";
import { CreateTopicDefinition, GetTopicDefinitions } from "./api";

export interface TopicStore {
  topics: TopicDefinition[];
  editTopic: TopicDefinition;
  createTopic: string;

  initialized: boolean;
  init: () => void;

  isCreate: boolean;
  openCreate: () => void;
  closeCreate: () => void;
  setCreateTopic: (topic: string) => void;
  handleCreateTopic: () => Promise<void>;

  isEdit: boolean;
  openEdit: (id: number) => void;
  closeEdit: () => void;
  updateTopic: (topic: string) => void;
  handleEditTopic: () => Promise<void>;
}

export const useTopicStore = create<TopicStore>((set, get) => ({
  topics: [],
  editTopic: { id: -1, topic: "" },
  createTopic: "",
  isCreate: false,
  isEdit: false,
  initialized: false,
  init: async () => {
    const topics = await GetTopicDefinitions();
    set({ topics: topics, initialized: true });
  },

  openCreate: () => {
    set({ isCreate: true });
  },
  closeCreate: () => {
    set({
      isCreate: false,
      createTopic: "",
    });
  },
  setCreateTopic: (topic: string) => {
    set({ createTopic: topic });
  },
  handleCreateTopic: async () => {
    await CreateTopicDefinition(get().createTopic);
    get().init();
  },

  openEdit: (id: number) => {
    set({
      isEdit: true,
      editTopic: get().topics.find((t) => t.id === id),
    });
  },
  closeEdit: () => {
    set({
      isEdit: false,
      editTopic: { id: -1, topic: "" },
    });
  },
  updateTopic: (topic: string) => {
    set({ editTopic: { ...get().editTopic, topic: topic } });
  },
  handleEditTopic: async () => {},
}));
