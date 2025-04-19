import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup.string().trim().required("Vui lòng nhập họ tên"),
  email: yup
    .string()
    .trim()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup.string().trim().required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
  phone: yup
    .string()
    .trim()
    .matches(/^(?:\+84|0)(3|5|7|8|9)[0-9]{8}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
});
