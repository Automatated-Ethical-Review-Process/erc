const Roles = {
   clerk: "clerk",
   applicant: "applicant",
   secretary: "secretary",
   i_reviewer: "internal_reviewer",
   e_reviewer: "external_reviewer",
   reviewer: "reviewer",
   admin: "admin",
};

export default Roles;

export const toRole = (name) => {
   let parsed = name.toLowerCase();
   switch (parsed) {
      case Roles.admin:
      case Roles.secretary:
      case Roles.reviewer:
      case Roles.clerk:
      case Roles.applicant:
         break;
      default:
         parsed = null;
   }
   return parsed;
};
