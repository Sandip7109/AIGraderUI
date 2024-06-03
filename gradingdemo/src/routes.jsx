import { HomeIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import { Home, Student, Teacher } from "@/pages/dashboard";
import AssessmentFormPage from "./pages/dashboard/Assessment/assessmentForm";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Teacher",
        path: "/teach",
        element: <Teacher />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Student",
        path: "/student",
        element: <Student />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Assessment",
        path: "/assessment-form",
        element: <AssessmentFormPage />,
      },
    ],
  },
];

export default routes;
