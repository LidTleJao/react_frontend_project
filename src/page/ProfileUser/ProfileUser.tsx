import { useNavigate } from "react-router-dom";
import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import { Edit, } from '@mui/icons-material';

function ProfileUserPage() {
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const navigate = useNavigate();

  function navigateToEditProfilePage() {
    navigate("/EditProfile");
  }

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

      <div className="flex w-screen h-screen justify-center items-center">
        <div className="flex w-3/4">
          <div className="w-1/4 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-red-500 rounded-full text-white text-3xl flex items-center justify-center">
                <img
                  src={user?.image_user}
                  width={150}
                  height={150}
                  className="rounded-lg"
                />

              </div>
              <p className="mt-4 text-center text-lg font-semibold">
                {user?.name_user}
              </p>
              <p className="text-sm text-gray-500">{user?.gmail_user}</p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="text-center cursor-pointer" onClick={navigateToEditProfilePage}>
                <Edit sx={{ mr: 1 }} /> 
                  แก้ไขข้อมูลส่วนตัว
              </div>
            </div>
          </div>

          <div className="w-3/4 p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-xl font-bold mb-6 text-center">แก้ไขข้อมูลส่วนตัว</h1>
            <div className="grid grid-cols-2 gap-6">

              <div>
                <label className="text-sm">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  value={user?.name_user}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="text-sm">ชื่อเล่น</label>
                <input
                  type="text"
                  value={user?.nick_user}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="text-sm">จังหวัด</label>
                <input
                  type="text"
                  value={user?.province}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="text-sm">ประเภทของผู้ใช้</label>
                <input
                  type="text"
                  value={user?.typename_user}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="text-sm">Facebook</label>
                <input
                  type="text"
                  value={user?.facebook}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="text-sm">Line ID</label>
                <input
                  type="text"
                  value={user?.lineID}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm">หมายเลขโทรศัพท์</label>
                <input
                  type="text"
                  value={user?.phone}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUserPage;
