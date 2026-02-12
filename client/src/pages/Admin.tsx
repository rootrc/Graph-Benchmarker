import axios from "axios";
import HeaderLayout from "../containers/HeaderLayout";

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
  async function test() {
    await axios.get(`${API_URL}/database/insert/test.json?graphId=1`);
    await axios.get(`${API_URL}/database/insert/testw.json?graphId=2`);
  }
  return (

    <HeaderLayout>
      <div className="min-h-screen">
        <button
          onClick={() => test()}
          className="w-30 px-6 py-3 font-semibold rounded bg-green-600 text-white hover:bg-green-500 transition-opacity duration-300 ease-in-out opacity-100 cursor-pointer"
        >
          Run
        </button>
      </div>
    </HeaderLayout>
  );
};