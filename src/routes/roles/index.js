import applicantRoute from "./applicant";
import clerkRoute from "./clerk";
import reviewerRoute from "./reviewer";
import secretaryRoute from "./secretary";
import adminRoute from "./admin";

const rolesRoutes = (
   <>
      {applicantRoute}
      {clerkRoute}
      {reviewerRoute}
      {secretaryRoute}
      {adminRoute}
   </>
);

export default rolesRoutes;
