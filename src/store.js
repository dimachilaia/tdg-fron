import create from 'zustand'
import axios from 'axios'
const useStore = create((set)=>({
  data:[],
  loading:false,
  hasErrors:false,
  
  fetch:async()=>{
    set(()=>({loading:true}));
    try {
        const response = await axios.get('http://localhost:3001');
        set({data: await response.data, loading:false})
    } catch (error) {
        console.log(error)
    }
  },
  removeStudent: id =>
    set(state => ({
      data: state.data.filter(student => student.id !== id)
    })),
    // addStudent: (student) =>
    // set(state => ({
    //   data: [
    //     {
    //       name: student.name,
    //       id: Math.random() * 100 + '',
    //       section: student.section
    //     },
    //     ...state.students
    //   ]
    // })),
}))

export default useStore