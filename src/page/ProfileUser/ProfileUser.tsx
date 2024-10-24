import HeaderUserTypeGeneral2 from "../../components/HeadUserTypeGeneral2";
import HeaderUserTypeManager2 from "../../components/HeadUserTypeManager2";
import { Edit, Save } from '@mui/icons-material';
import { useState } from "react";
import { UserService } from "../../service/userService";

function ProfileUserPage() {
  const user = JSON.parse(localStorage.getItem("objUser")!);
  const userService = new UserService();

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [imagePreview, setImagePreview] = useState(user?.image_user || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedUser(user);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev: typeof user) => ({ ...prev, [name]: value }));
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setEditedUser((prev: typeof user) => ({ ...prev, province: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น.");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.onerror = () => {
        alert("เกิดข้อผิดพลาดในการอ่านไฟล์");
      };

      reader.readAsDataURL(file);
    } else {
      alert("กรุณาเลือกไฟล์");
    }
  };

  const handleSave = async () => {
    try {
      const { uid, name_user, nick_user, phone, facebook, lineID } = editedUser;

      await userService.update(uid, name_user, nick_user, editedUser.province, phone, facebook, lineID, selectedFile || undefined);
      localStorage.setItem("objUser", JSON.stringify(editedUser));
      setIsEditing(false);
      alert("ข้อมูลส่วนตัวถูกบันทึกเรียบร้อยแล้ว!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  // List of provinces (example, replace with actual provinces)
  const provinces = [
    "กรุงเทพมหานคร",
    "กระบี่",
    "กาญจนบุรี",
    "กาฬสินธุ์",
    "กำแพงเพชร",
    "ขอนแก่น",
    "จันทบุรี",
    "ฉะเชิงเทรา",
    "ชลบุรี",
    "ชัยนาท",
    "ชัยภูมิ",
    "ชุมพร",
    "เชียงราย",
    "เชียงใหม่",
    "ตรัง",
    "ตราด",
    "ตาก",
    "นครนายก",
    "นครปฐม",
    "นครพนม",
    "นครราชสีมา",
    "นครศรีธรรมราช",
    "นครสวรรค์",
    "นนทบุรี",
    "นราธิวาส",
    "น่าน",
    "บึงกาฬ",
    "บุรีรัมย์",
    "ปทุมธานี",
    "ประจวบคีรีขันธ์",
    "ปราจีนบุรี",
    "ปัตตานี",
    "พระนครศรีอยุธยา",
    "พังงา",
    "พัทลุง",
    "พิจิตร",
    "พิษณุโลก",
    "เพชรบุรี",
    "เพชรบูรณ์",
    "แพร่",
    "พะเยา",
    "ภูเก็ต",
    "มหาสารคาม",
    "มุกดาหาร",
    "แม่ฮ่องสอน",
    "ยโสธร",
    "ยะลา",
    "ร้อยเอ็ด",
    "ระนอง",
    "ระยอง",
    "ราชบุรี",
    "ลพบุรี",
    "ลำปาง",
    "ลำพูน",
    "เลย",
    "ศรีสะเกษ",
    "สกลนคร",
    "สงขลา",
    "สตูล",
    "สมุทรปราการ",
    "สมุทรสงคราม",
    "สมุทรสาคร",
    "สระแก้ว",
    "สระบุรี",
    "สิงห์บุรี",
    "สุโขทัย",
    "สุพรรณบุรี",
    "สุราษฎร์ธานี",
    "สุรินทร์",
    "หนองคาย",
    "หนองบัวลำภู",
    "อ่างทอง",
    "อำนาจเจริญ",
    "อุดรธานี",
    "อุตรดิตถ์",
    "อุทัยธานี",
    "อุบลราชธานี"
  ];

  return (
    <>
      {(user?.type_user === 2 && <HeaderUserTypeManager2 />) ||
        (user?.type_user === 1 && <HeaderUserTypeGeneral2 />)}

      <div className="flex w-screen h-screen justify-center items-center">
        <div className="flex w-3/4">
          <div className="w-1/4 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-red-500 rounded-full text-white text-3xl flex items-center justify-center">
                <img
                  src={imagePreview}
                  width={150}
                  height={150}
                  className="rounded-lg"
                  alt="User"
                />
              </div>
              <p className="mt-4 text-center text-lg font-semibold">
                {editedUser?.name_user}
              </p>
              <p className="text-sm text-gray-500">{user?.gmail_user}</p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="text-center cursor-pointer" onClick={handleEditToggle}>
                <Edit sx={{ mr: 1 }} />
                {isEditing ? "ยกเลิกแก้ไข" : "แก้ไขข้อมูลส่วนตัว"}
              </div>
              {isEditing && (
                <div className="text-center cursor-pointer" onClick={handleSave}>
                  <Save sx={{ mr: 1 }} />
                  {"บันทึกข้อมูล"}
                </div>
              )}
            </div>
          </div>

          <div className="w-3/4 p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-xl font-bold mb-6 text-center">ข้อมูลส่วนตัว</h1>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  name="name_user"
                  value={editedUser?.name_user}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-sm">ชื่อเล่น</label>
                <input
                  type="text"
                  name="nick_user"
                  value={editedUser?.nick_user}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-sm">จังหวัด</label>
                <select
                  name="province"
                  value={editedUser?.province}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled={!isEditing}
                  onChange={handleProvinceChange}
                >
                  <option value="">เลือกจังหวัด</option>
                  {provinces.map((province, index) => (
                    <option key={index} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm">ประเภทของผู้ใช้</label>
                <input
                  type="text"
                  name="typename_user"
                  value={editedUser?.typename_user}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="text-sm">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  value={editedUser?.facebook}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-sm">Line ID</label>
                <input
                  type="text"
                  name="lineID"
                  value={editedUser?.lineID}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm">หมายเลขโทรศัพท์</label>
                <input
                  type="text"
                  name="phone"
                  value={editedUser?.phone}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {isEditing && (
                <div className="col-span-2">
                  <label className="text-sm">อัปโหลดภาพโปรไฟล์</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded-lg bg-gray-100"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUserPage;
