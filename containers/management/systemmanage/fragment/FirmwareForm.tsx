import { useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";

export default function FirmwareForm() {
  const { register, handleSubmit } = useForm();
  const onValid = () => {};
  const onInvalid = () => {};
  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
      className="flex items-center justify-between space-x-4"
    >
      <label
        htmlFor="fFileUp"
        className="relative -right-11 cursor-pointer text-blue-700"
      >
        <AiOutlineUpload />
      </label>
      <input
        id="fFileUp"
        type="file"
        className="min-w-[350px] cursor-pointer border-[1px] border-gray-200 text-sm text-slate-500
                file:mr-4 file:cursor-pointer file:border-0
                file:bg-violet-50 file:py-2
                file:px-8 file:text-sm
                file:font-semibold file:text-blue-700 
              "
      />
      <button
        type="submit"
        className="min-w-[280px] rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
      >
        펌웨어 버전 업데이트
      </button>
    </form>
  );
}
