import { Modal } from "./modal";
import {AddOrEditPlate} from "@/components/addOrEditPlate";
import React from "react";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  return <Modal>

    <div className="w-full mx-auto mt-10 bg-white p-6  rounded-lg">
      <h1 className="text-xl font-bold mb-6">ویرایش پلاک</h1>
      <AddOrEditPlate/>
    </div>

  </Modal>;
}
