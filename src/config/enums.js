const VersionStatus = {
  pending: "PENDING",
  submitted: "SUBMITTED",
  underReview: "UNDER_REVIEW",
  major: "MAJOR",
  minor: "MINOR",
  reviewed: "REVIEWED",
  granted: "GRANTED",
  rejected: "REJECTED",
};

const DecisionTypes = {
  approved: "APPROVED",
  disapproved: "DISAPPROVED",
  major: "MAJOR",
  minor: "MINOR",
  undecided: "UNDECIDED",
};

export { VersionStatus, DecisionTypes };
