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

const DecisionType = {
  approved: "APPROVED",
  disapproved: "DISAPPROVED",
  major: "MAJOR",
  minor: "MINOR",
  undecided: "UNDECIDED",
};

const ProposalType = {
  animal: "ANIMAL_RESEARCH",
  human: "HUMAN_RESEARCH",
};

const EReviewType = {
  exemption: "EXEMPTION",
  expedited: "EXPEDITED",
  fullBoard: "FULLBOARD",
};

const ReviewerStatus = {
  confirm: "CONFIRM",
  reject: "REJECT",
  pending: "PENDING",
  completed: "COMPLETED",
};

export {
  VersionStatus,
  DecisionType,
  ProposalType,
  EReviewType,
  ReviewerStatus,
};
