import * as Yup from "yup";

const phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const bookingFormSchema = Yup.object({
  fullName: Yup.string().required("Full name is required."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required."),
  contactNumber: Yup.string()
    .required("Contact number is required.")
    .matches(phoneRegEx, "Invalid phone number."),
  localGuest: Yup.number()
    .required("Number of local guests is required.")
    .min(0, "You cannot enter negative values."),
  foreignGuest: Yup.number()
    .required("Number of foreign guests is required.")
    .min(0, "You cannot enter negative values."),
  tourDate: Yup.date()
    .required("Tour date is required.")
    .min(
      new Date(),
      `Please select a date after ${new Date().toLocaleDateString()}.`
    ),
  pickupInfo: Yup.string().max(30, "Max amount of characters is 30."),
});
