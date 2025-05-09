import { Modal } from "./modal";
import {AddOrEditPlate} from "@/components/addOrEditPlate";
import React from "react";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Modal>

    <div className="w-full mx-auto  bg-white xl:mt-10 xl:p-6  rounded-lg">
      <h1 className="text-xl font-bold mb-6 max-xl:text-center">افزودن پلاک</h1>
      <AddOrEditPlate/>
    </div>

  </Modal>;
}
