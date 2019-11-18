# Abstract

Rated Disabilities is a common function among the veteran community to see what their Total Calulated Disability Rating is, what individual disability ratings are factored into that calculation and what is currently pending from the Claim Status Tool. These data are important as they inform the Veteran what their service connected rating is and what benefits they might be elegible for.

## Overview

The React components in the Rated Disabilities page are wrapped in a `DowntimeNotification` component so that if the back end is expereinceing downtime, no further components will load. If the back end is not experiencing downtime, the front end components will then load.

When the Rated Disabilities front end components load, two API calls to the EVSS service are initiated from the React Components. These calls are initiated inside the `componentDidMount` lifecycle hooks when the respective components load so these calls are made asyncronously. The calls are

| Calling Component | URL Called | Data recieved |
| --------------------|------------|------------------|
| TotalRatedDisabilities | disability_compensation_form/find_rating_info_pid | Total Disability Rating |
| RatedDisabilityList | disability_compensation_form/rated_disabilities | Individual Disability Ratings |

The data from these API calls are performed inside the redux action and the data then consumed by the front end components. 

The `TotalRatedDisabilities` component either recieves data from the API call or recieves an error from the API. We show different content for each of these possible scenarios; these different content blocks are housed inside `TotalRatingStates.jsx`. If the API returned a Total Disability Rating, that rating is rendered in two places inside the content and that content is rendered inside the component. If the API returns an error, there are separate content blocks for each respective error we can recieve. Those content blocks are then rendered inside the component.

The `RatedDisabilityList` component either recieves data from the API or recieves an error from the API. We show different content for each of these possible scenarios inside the component itself. If the API returned an array of objects with individual disability ratings, those ratings and the data that comes with them, are rendered in a list of `RatedDisabilityListItem` components. If the API returns an error, there are is content rendered based on the error recieved.
