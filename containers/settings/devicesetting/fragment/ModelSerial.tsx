import useModelInfo from "@api/setting/getModelInfo";
import modifySerialNumber from "@api/setting/modifySerialNumber";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface ModelForm {
  modelname?: string;
  serialnumber: string;
}

export default function ModelSerial({ ABS_URL }: any) {
  const { modelInfo } = useModelInfo({ ABS_URL });
  let modelNameGetValue = modelInfo?.modelName;
  let modelSerialGetValue = modelInfo?.modelSerial;
  // const [modelName, setModelName] = useState(modelNameGetValue);
  const [modelSerial, setModelSerial] = useState(modelSerialGetValue);
  const { register, handleSubmit } = useForm<ModelForm>();

  const modelInfoJson = {
    modelName: modelNameGetValue,
    modelSerial: modelSerial ?? modelSerialGetValue,
  };

  const onValid = (data: ModelForm) => {
    modifySerialNumber({ ABS_URL }, modelInfoJson);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <div className="w-full rounded-md bg-white shadow-md">
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="h-full">
        <div className="flex h-full items-center justify-between px-10">
          <div className="flex w-2/5 items-center">
            <span className="pr-2 text-sm font-medium text-gray-900">
              모델명
            </span>
            <input
              {...register("modelname", {
                disabled: true,
              })}
              defaultValue={modelNameGetValue ?? ""}
              type="text"
              className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 outline-none focus:border-[1px] focus:border-gray-700"
              placeholder="모델명"
            />
          </div>
          <div className="flex w-2/5 items-center">
            <label
              htmlFor="serialnumber"
              className="pr-2 text-sm font-medium text-gray-900"
            >
              시리얼 넘버
            </label>
            <input
              {...register("serialnumber", {
                required: "시리얼 넘버를 입력하세요.",
                onChange: (e) => setModelSerial(e.target.value),
              })}
              id="serialnumber"
              defaultValue={modelSerialGetValue ?? ""}
              type="text"
              className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
              placeholder="시리얼 넘버"
            />
          </div>
          <div className="flex w-1/5 justify-end">
            <button
              type="submit"
              className="rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
            >
              설정 적용
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
