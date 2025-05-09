import { Modal } from "./modal";
import {AddOrEditPlate} from "@/components/addOrEditPlate";
import React from "react";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const Id = (await params).id;
  console.log({Id})
  return <Modal>

    <div className="w-full mx-auto mt-5 xl:mt-10 xl:p-6 bg-white  rounded-lg">
      <h1 className="text-xl font-bold mb-6 max-xl:text-center">ویرایش پلاک</h1>
      <AddOrEditPlate/>
    </div>

  </Modal>;
}
