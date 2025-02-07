import AddBookForm from "@/components/AddBookForm";
import { Modal } from "./modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  return <Modal>

    <div className="w-full mx-auto mt-10 bg-white p-6  rounded-lg">
      <h1 className="text-xl font-bold mb-6">افزودن کتاب</h1>
      <AddBookForm/>
    </div>

  </Modal>;
}
