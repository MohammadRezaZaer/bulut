import {AddOrEditPlate} from "@/components/addOrEditPlate";
import React from "react";

export const dynamicParams = false;

export function generateStaticParams() {
  let slugs = ["1", "2", "3", "4", "5", "6"];
  return slugs.map((slug) => ({ id: slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log({params})
  return <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded-lg">
    <h1 className="text-xl font-bold mb-6 max-xl:text-center">ویرایش پلاک</h1>
    <AddOrEditPlate/>




  </div>;
}
