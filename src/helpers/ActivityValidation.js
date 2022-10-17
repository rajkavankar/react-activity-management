import * as yup from "yup"

export const ActivityValidation = yup.object().shape({
  activity_title: yup.string().required("Activity title is required"),
  activity_for: yup.string().required("please select audiance"),
  activity_target: yup.string().required("please select activity target"),
  start_date: yup.string().required("please add start date"),
  end_date: yup.string().required("please select end date"),
  start_time: yup.string().required("please add start time"),
  end_time: yup.string().required("please select end time"),
  resource_person: yup.string().required("please select end resource person"),
  tags: yup.string().required("please add tags"),
  descripsion: yup.string().required("please add descripsion"),
})
