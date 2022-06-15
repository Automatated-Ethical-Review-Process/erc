const roles = {
   clerk: "ROLE_CLERK",
   applicant: "ROLE_APPLICANT",
   secretary: "ROLE_SECRETARY",
   reviewer: "ROLE_REVIEWER",
   admin: "ROLE_ADMIN",
};

export default roles;

export const toRole = (name) => {
   let parsed = "ROLE_" + name.toUpperCase();
   switch (parsed) {
      case roles.admin:
      case roles.secretary:
      case roles.reviewer:
      case roles.clerk:
      case roles.applicant:
         break;
      default:
         parsed = null;
   }
   return parsed;
};
