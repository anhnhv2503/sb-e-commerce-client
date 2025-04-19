import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: yup.string().trim().required("Vui lòng nhập mật khẩu"),
  })
  .required("Vui lòng nhập thông tin đăng nhập");
