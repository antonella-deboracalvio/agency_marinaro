// Publish the approved notice under public/ and set the same version on the server.
// Empty values intentionally keep both public forms inactive until review is complete.
export const legalPublication = {
  privacyNoticeUrl: "",
  privacyNoticeVersion: "",
};

export function hasPublishedPrivacy(config = legalPublication) {
  return typeof config.privacyNoticeUrl === "string" && /^\/(?!\/)[a-z\d/_-]+(?:\.pdf|\.html)?$/i.test(config.privacyNoticeUrl)
    && typeof config.privacyNoticeVersion === "string" && /^[a-z\d._-]{1,80}$/i.test(config.privacyNoticeVersion);
}
