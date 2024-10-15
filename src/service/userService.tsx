import axios from "axios";

const HOST: string = "https://node-backend-project-tnxp.onrender.com/user";
// const HOST: string = "http://localhost:3000/user";

export class UserService {
  async getAll() {
    const url = HOST + "/allUser";
    const response = await axios.get(url);

    return response;
  }

  async getByUid(uid: string) {
    const url = HOST + "/" + uid;
    const response = await axios.get(url);
    return response;
  }

  async login(gmail_user: string, password_user: string){
    const url = HOST + "/login";
    const body = {
      gmail_user: gmail_user,
      password_user: password_user,
    };
    const response = await axios.post(url, body);
    return response;
  }

  async register(
    name: string,
    nickname: string,
    facebook: string,
    phone: string,
    province: string,
    gmail: string,
    pass: string,
    type_user: number
  ) {
    const url = HOST + "/register";
    // const url = "http://localhost:3000/user/register"
    const body = {
      
      image_user: "",
      name_user: name,
      nickname_user: nickname,
      province: province,
      gmail_user: gmail,
      password_user: pass,
      facebook: facebook,
      phone: phone,
      type_user: type_user,
    };
    const response = await axios.post(url, body);
    return response;
  }

  async update(
    uid: string,
    image_user: File,
    name_user: string,
    nick_user: string,
    province: string,
    phone: string,
    facebook: string,
    lineID: string
  ) {
    const url = `${HOST}/update/${uid}`;
    
    // สร้าง FormData และเพิ่มข้อมูลลงไป
    const formData = new FormData();
    formData.append("file", image_user); // ใช้ชื่อฟิลด์ 'file' ที่ตรงกับชื่อที่กำหนดใน multer
    formData.append("name_user", name_user);
    formData.append("nickname_user", nick_user);
    formData.append("province", province);
    formData.append("phone", phone);
    formData.append("facebook", facebook);
    formData.append("lineID", lineID);
    
    try {
      // ส่งข้อมูลผ่าน axios
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error; // ขึ้นอยู่กับว่าคุณต้องการจัดการข้อผิดพลาดอย่างไร
    }
  }
  
}
