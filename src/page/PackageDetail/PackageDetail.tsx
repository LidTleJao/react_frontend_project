import { useEffect, useState } from "react";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import { PacketGetPIDRes } from "../../model/Response/Packet/Packet/PacketGetByPIDRes";
import { PacketService } from "../../service/packetService";
import { useParams } from "react-router-dom";

function PackageDetailPage() {
    const { pid } = useParams();
  const packetService  = new PacketService();
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const [packetselect, setPacketselect] = useState<PacketGetPIDRes[]>([]);

  useEffect(()=>{
    if (!pid) return;
    const loadDataAsync = async () =>{
        const respacket = await packetService.getPacketByPID(pid);
        const data: PacketGetPIDRes[] = respacket.data;
        setPacketselect(data);
    };
    loadDataAsync();
  },[pid]);

  console.log(packetselect);
  

  return (
    <>
      {(user?.type_user === 2 && (
        <>
          <HeaderUserTypeManager2 />
        </>
      )) ||
        (user?.type_user === 1 && (
          <>
            <HeaderUserTypeGeneral2 />
          </>
        ))}
    </>
  );
}
export default PackageDetailPage;
