import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";

function ProfileUserPage() {
  const user = JSON.parse(localStorage.getItem("objUser")!);
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
      <div className="w-screen h-screen flex justify-center items-center">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 className="text-black text-3xl text-center pb-4">
            โปรไฟล์ของฉัน
          </h1>

          <div className="w-auto p-10 bg-sky-200 rounded-2xl">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <img
                  src={user?.image_user}
                  width={150}
                  height={150}
                  className="rounded-lg"
                />
                <div className="flex flex-row ">
                  <div className="flex pl-10 flex-col ">
                    <label>ชื่อ-นามสกุล</label>
                    <input
                      type="text"
                      value={user?.name_user}
                      className=" pl-2 pr-2 rounded-lg  bg-white"
                      disabled
                    />
                  </div>
                  <div className="flex pl-10 flex-col">
                    <label> ชื่อเล่น</label>
                    <input
                      type="text"
                      value={user?.nick_user}
                      className=" pl-2 pr-2 rounded-lg  bg-white"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-around">
                <div className="flex flex-col pt-2">
                  <label>จังหวัด</label>
                  <input
                    type="text"
                    value={user?.province}
                    className=" pl-2 pr-2 rounded-lg  bg-white"
                    disabled
                  />
                </div>
                <div className="flex flex-col pt-2">
                  <label>เบอร์โทร</label>
                  <input
                    type="text"
                    value={user?.phone}
                    className=" pl-2 pr-2 rounded-lg  bg-white"
                    disabled
                  />
                </div>
                <div className="flex flex-col pt-2">
                  <label>Facebook</label>
                  <input
                    type="text"
                    value={user?.facebook}
                    className=" pl-2 pr-2 rounded-lg  bg-white"
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-row justify-start ">
                <div className="flex flex-col pt-2 pl-1">
                  <label>Line</label>
                  <input
                    type="text"
                    value={user?.lineID}
                    className=" pl-2 pr-2 rounded-lg  bg-white"
                    disabled
                  />
                </div>
                <div className="flex flex-col pt-2 pl-3">
                  <label>ประเภท</label>
                  <input
                    type="text"
                    value={user?.typename_user}
                    className=" pl-2 pr-2 rounded-lg bg-white"
                    disabled
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileUserPage;
