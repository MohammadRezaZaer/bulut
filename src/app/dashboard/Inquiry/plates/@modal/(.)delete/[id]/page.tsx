"use client"

import {type ElementRef, useEffect, useRef, useState} from 'react'
import {DialogShell} from "@/components/dialog-shell";
import {DeletePlate} from "@/components/deletePlate";

export default  function PhotoModal() {


  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);



  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (



      <DialogShell show={open} initialFocus={cancelButtonRef} onClose={setOpen}>
        <DeletePlate />

      </DialogShell>



  );
}
