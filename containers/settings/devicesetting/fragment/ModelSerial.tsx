import useModelInfo from "@api/setting/getModelInfo";
import modifySerialNumber from "@api/setting/modifySerialNumber";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ModelForm {
  modelname?: string;
  serialnumber: string;
}
const GET_MODEL_INFO_API_URL = process.env.NEXT_PUBLIC_GET_MODEL_INFO;

export default function ModelSerial({ ABS_URL }: any) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ModelForm>();
  const { modelInfoData } = useModelInfo({ ABS_URL });
  const [modelInfo, setModelInfo]: any = useState();
  let modelNameGetValue = modelInfo?.modelName;
  let modelSerialGetValue: any = modelInfo?.modelSerial;
  // const [modelName, setModelName] = useState(modelNameGetValue);
  const [modelSerial, setModelSerial] = useState(modelSerialGetValue);

  useEffect(() => {
    if (modelInfoData) {
      setModelInfo(modelInfoData);

      setValue("serialnumber", modelSerialGetValue);
    }
  }, [modelInfoData, modelInfo]);

  const modelInfoJson = {
    modelName: modelNameGetValue,
    modelSerial: modelSerial ?? modelSerialGetValue,
  };

  const onValid = () => {
    modifySerialNumber({ ABS_URL }, modelInfoJson);
  };

  const onInvalid = () => {
    toast.warning(`설정 오류 !`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div className="w-full rounded-md bg-white p-10 shadow-md">
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="h-full">
        <div className="flex h-full items-center justify-between">
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
          <div className="relative flex w-2/5 items-center">
            <label
              htmlFor="serialnumber"
              className="min-w-[85px] pr-2 text-right text-sm font-medium text-gray-900"
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
              maxLength={16}
            />
            {errors.serialnumber && (
              <ErrorMessage
                errors={errors}
                name="serialnumber"
                render={({ message }) => (
                  <p className="absolute -bottom-6 left-20 mt-2 text-sm text-red-600">
                    {message}
                  </p>
                )}
              />
            )}
          </div>
          <div className="flex w-1/5 justify-end">
            <button
              type="submit"
              onClick={() => {
                setValue("serialnumber", modelSerial ?? modelSerialGetValue);
              }}
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
