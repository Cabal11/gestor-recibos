import React from "react";
import { Button } from "@/components/ui/button";

function SaveFile(recibos: {
  id: number;
  tipo: string;
  fecha: string;
  monto: number;
  estado: string;
}) {
  return (
    <Button
      type="submit"
      className="bg-green-500 text-white hover:bg-green-600 mt-6"
      
    >
      Registrar recibo
    </Button>
  );
}

export default SaveFile;
