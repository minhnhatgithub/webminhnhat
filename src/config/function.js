import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
const privateKey = "minhnhat_123456";
export const Function = {
  base_Url: () => `${window.location.protocol}//${window.location.host}/`,
  stringToMD5: (str) => CryptoJS.MD5(str).toString(),
  vaildPassword: (str) => {
    if (typeof str !== "string") return false;
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(str); // Có ít nhất 6 ký tự, 1 chữ hoa, 1 số, không khoảng trắng
  },
  vaildUsername: (str) => {
    if (typeof str !== "string") return false;
    return /^[A-Za-z][A-Za-z0-9_]{3,19}$/.test(str); // 4–20 ký tự, chỉ chứa chữ, số hoặc dấu _
  },
  makeToast: (msg, icon = "info") => {
    Swal.fire({
      title: msg,
      icon,
      toast: true,
      position: "top-end",
      showCloseButton: true,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      width: "auto",
    });
  },

  getDay: () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // thêm số 0 nếu nhỏ hơn 10
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  },
  showMessage: (title, msg, icon = "info") => {
    Swal.fire({
      title,
      text: msg,
      icon,
      confirmButtonText: "Đóng",
    });
  },
};

export const Encryptor = {
  encrypt(text) {
    return CryptoJS.AES.encrypt(text, this.privateKey).toString();
  },
  decrypt(cipherText) {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.privateKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted || null;
    } catch (e) {
      console.error("Giải mã thất bại:", e);
      return null;
    }
  },
};
