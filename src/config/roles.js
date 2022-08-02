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

export const getRoles = (role) => {
  const roles = [];
  switch (role) {
    case Roles.admin:
      roles.push(Roles.admin);
      break;
    case Roles.secretary:
      roles.push(Roles.secretary);
      roles.push(Roles.i_reviewer);
      break;
    case Roles.clerk:
      roles.push(Roles.clerk);
      break;
    case Roles.e_reviewer:
      roles.push(Roles.e_reviewer);
      roles.push(Roles.applicant);
      break;
    case Roles.i_reviewer:
      roles.push(Roles.i_reviewer);
      roles.push(Roles.applicant);
      break;
    case Roles.applicant:
      roles.push(Roles.applicant);
      break;
    default:
      break;
  }
  return roles;
};

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
