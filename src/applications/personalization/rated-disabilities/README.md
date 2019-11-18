# Abstract

Rated Disabilities is a common tool used among the veteran community to view their Total Combined Disability Rating, a list of rated disabilities that may factor into the combined rating, and what may be currently pending from the Claim Status Tool. These data are important as they inform the Veteran what their service connected rating is and what benefits they might be elegible for.

## Overview

Rated Disabilities retreives data from EVSS. The React components in the Rated Disabilities page are wrapped in a `DowntimeNotification` component so if EVSS is experiencing downtime, no further components will load, and any additional API calls will not be made. If EVSS is not experiencing downtime, the front end components will load as expected.

When the Rated Disabilities front end components load, two API calls to the EVSS service are asynchronously initiated from the `componentDidMount` lifecycle hook. The calls are

| Calling Component | URL Called | Data recieved |
| --------------------|------------|------------------|
| TotalRatedDisabilities | disability_compensation_form/find_rating_info_pid | Total Disability Rating |
| RatedDisabilityList | disability_compensation_form/rated_disabilities | Individual Disability Ratings |

The `TotalRatedDisabilities` component either receives data or an error from the API.. We show different content for each of these possible scenarios; these different content blocks are housed inside `TotalRatingStates.jsx`. If the API returned a Total Combined Disability Rating, that rating is rendered in two places inside the content and that content is rendered inside the component. If the API returns an error, there are separate content blocks for each respective error we can recieve. Those content blocks are then rendered inside the component.

The `RatedDisabilityList` component either receives data or an error from the API. Different content for each of these possible scenarios inside is handled inside the component itself. If the API returns an array of objects with individual disability ratings, those ratings and the data that comes with them, are rendered in a list of `RatedDisabilityListItem` components. If the API returns an error, there is content rendered based on the error received.
