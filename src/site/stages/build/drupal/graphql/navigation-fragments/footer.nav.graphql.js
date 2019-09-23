/**
 * The global header megamenu from Drupal.
 *
 */

module.exports = `
      ... on MenuLinkContentFooter {
        menuName
        weight
        link {
          url {
            path
          }
        }
        fieldLabel
        fieldOpenLinkInNewTab
      }
      ... on MenuLinkContentFooterBottomRail {
        menuName
        weight
        link {
          url {
            path
          }
        }
        fieldOpenLinkInNewTab
      }
`;
