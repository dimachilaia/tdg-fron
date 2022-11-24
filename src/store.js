import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  data: [],
  loading: false,
  hasErrors: false,

  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get("http://localhost:3001");
      set({ data: await response.data, loading: false });
    } catch (error) {
      console.log(error);
    }
  },
  removePerson: (id) =>
    set((state) => ({
      data: state.data.filter((student) => student.id !== id),
    })),
  addPerson: (person) =>
    set((state) => ({
      data: [
        {
          name: person.name,
          id: new Date().getUTCMilliseconds(),
          email: person.email,
          address: {
            street: person.street,
            city: person.city,
          },
          phone: person.phone,
          gender: person.gender,
        },
        ...state.data,
      ],
    })),
  updatePerson: (person) =>
    set((state) => ({
      data: state.data.map((item) => {
        if (item.id === person.id) {
          // console.log(item.id, person.id);
          // console.log(item, person);
          return {
            name: person.name,
            id: person.id,
            email: person.email,
            address: {
              street: person.street,
              city: person.city,
            },
            phone: person.phone,
            gender: person.gender,
          };
        } else {
          return item;
        }
      }),
    })),
}));

export default useStore;
