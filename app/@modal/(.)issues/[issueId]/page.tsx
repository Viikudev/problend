"use client";

import Modal from "@/app/components/Modal";
import { useParams } from "next/navigation";

export default function Issue() {
  const params = useParams();
  return <Modal>{params.id}</Modal>;
}
